var express = require("express"),
  http = require("http"),
  port = 80,
  app = require("express")(),
  server = http.createServer(app),
  io = require("socket.io")(server),
  liveCart;

console.log("Real time POS running");
console.log("Server started");

app.get("/", function(req, res) {
  res.send(" Real time POS web app running.");
});

app.use("/api", require("./api/inventory"));
app.use("/api", require("./api/transactions"));

// Websocket logic for Live Cart
io.on("connection", function(socket) {
  socket.on("cart-transaction-complete", function() {
    socket.broadcast.emit("update-live-cart-display", {});
  });

  // upon page load, give user current cart
  socket.on("live-cart-page-loaded", function() {
    socket.emit("update-live-cart-display", liveCart);
  });

  // upon connecting, make client update live cart
  socket.emit("update-live-cart-display", liveCart);

  socket.on("change color", color => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log("Color Changed to: ", color);
    io.sockets.emit("change color", color);
  });

  // when the cart data is updated by the POS
  socket.on("update-live-cart", function(cartData) {
    // keep track of it
    liveCart = cartData;

    // broadcast updated live cart to all websocket clients
    socket.broadcast.emit("update-live-cart-display", liveCart);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
