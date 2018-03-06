import React, { Component } from "react";
import "./App.css";

class LivePos extends Component {
  handleChange = (id, itemNumber) => {
    this.props.onQuantityChange(id, itemNumber);
  };
  render() {
    const { id, name, price, quantity } = this.props;
    var itemNumber = quantity;
    return (
      <tr>
        <td class="col-md-2"> {name}</td>
        <td class="col-md-1"> ${price}</td>
        <td class="col-md-2">
          <button
            class="btn btn-sm pull-left"
            onClick={() => this.handleChange(id, --itemNumber)}
          >
            <i class="glyphicon glyphicon-minus" />
          </button>

          <div class="col-md-6">
            <input type="number" value={itemNumber} />
          </div>

          <button
            class="btn btn-sm pull-right"
            onClick={() => this.handleChange(id, ++itemNumber)}
          >
            <i class="glyphicon glyphicon-plus" />
          </button>
        </td>
        <td class="col-md-2">$0.00</td>
        <td class="col-md-2">{price}</td>
        <td class="col-md-2">
          <button class="btn btn-danger">
            <i class="glyphicon glyphicon-trash" />
          </button>
        </td>
      </tr>
    );
  }
}

export default LivePos;
