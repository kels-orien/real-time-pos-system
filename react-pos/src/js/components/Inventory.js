import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import { connect } from "react-redux";
import Product from "./Product";
import { addProducts } from "../actions/action";
import { getProducts } from "../api";
import { withRouter } from "react-router-dom";
import axios from "axios";

const HOST = "http://localhost:80";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    var url = HOST + `/api/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
      //dispatch(addProducts(response.data));
    });
  }
  render() {
    var { products } = this.state;
    //var { products } = this.props.products;

    var renderProducts = () => {
      if (products.length === 0) {
        return <p>{products}</p>;
      }
      return products.map(product => <Product {...product} />);
    };

    return (
      <div>
        <Header />

        <div class="container">
          <a
            href="#/inventory/create-product"
            class="btn btn-success pull-right"
          >
            <i class="glyphicon glyphicon-plus" /> Add New Item
          </a>
          <br />
          <br />

          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity on Hand</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Inventory;
