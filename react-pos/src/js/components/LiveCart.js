import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import Header from "./Header";
import axios from "axios";
import RecentTransactions from "./RecentTransactions";
import LiveTransactions from "./LiveTransactions";
import moment from "moment";

const HOST = "http://localhost:80";
var url = HOST + `/api//day-total/`;
class LiveCart extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [], liveTransactions: [] };
  }
  componentWillMount() {
    // console.dir(socket);
    var trans = [
      { date: "3/1/2018 9:42 AM", total: "450" },
      { date: "3/1/2018 10:51 AM", total: "790" }
    ];
    const HOST = "http://localhost:80";
    var url = HOST + `/api//day-total/`;
    axios.get(url).then(response => {
      this.setState({ transactions: trans });
      console.log("response", response.data);
    });

    var socket = io.connect(HOST);

    socket.on("update-live-cart-display", liveCart => {
      this.setState({ liveTransactions: liveCart });
    });
  }
  componentWillUnmount() {
    // socket.disconnect();
    // alert("Disconnecting Socket as component will unmount");
  }
  render() {
    var { transactions, liveTransactions } = this.state;
    var renderRecentTransactions = () => {
      if (transactions.length === 0) {
        return <p>No recent transactions available</p>;
      } else {
        return transactions.map(transaction => (
          <RecentTransactions {...transaction} />
        ));
      }
    };
    var renderDate = () => {
      return moment().format("DD-MMM-YYYY HH:mm:ss");
    };
    var renderLiveTransactions = () => {
      if (liveTransactions.length === 0) {
        return (
          <div>
            <div class="col-md-5 pull-right">
              <div>
                <div class="alert alert-warning text-center" role="alert">
                  <strong>Not Active:</strong> No items added at the moment.
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return liveTransactions.map(liveTransaction => (
          <LiveTransactions {...liveTransaction} />
        ));
      }
    };
    return (
      <div>
        <Header />
        <div class="livecart">
          <div class="col-md-5 pull-right">
            <div class="panel panel-primary">
              <div class="panel-heading text-center lead">{renderDate()}</div>

              <table class="receipt table table-hover">
                <thead>
                  <tr class="small">
                    <th> Quantity </th>
                    <th> Product </th>
                    <th> Price </th>
                  </tr>
                </thead>
                <tbody>{renderLiveTransactions()}</tbody>
              </table>
            </div>
          </div>
          <div class="col-md-5 pull-left">
            <div class="panel panel-default">
              <div class="panel-heading lead text-center">
                Recent Transactions
              </div>

              <div class="panel-body">
                <div class="text-center">
                  <span>Today's Sales</span>
                  <br />
                  <span class="text-success checkout-total-price">
                    $<span />
                  </span>
                </div>

                <table class="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>{renderRecentTransactions()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveCart;
