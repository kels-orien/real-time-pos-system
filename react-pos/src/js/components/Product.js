import React, { Component } from "react";

class Product extends Component {
  render() {
    const { name, price, quantity } = this.props;
    return (
      <tr>
        <td>
          <a href=""> {name} </a>
        </td>
        <td> {price} </td> <td> {quantity} </td>
        <td>
          <a class="btn btn-info">
            <i class="glyphicon glyphicon-pencil" />
          </a>
        </td>
      </tr>
    );
  }
}

export default Product;
