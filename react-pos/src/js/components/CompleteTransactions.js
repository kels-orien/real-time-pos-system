import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
class CompleteTransactions extends Component {
  render() {
    var { date, total, price, items } = this.props;
    var renderQuantity = items => {
      var totalquantity = 0;
      for (var i = 0; i < items.length; i++) {
        totalquantity =
          parseInt(totalquantity, 10) + parseInt(items[i].quantity, 10);
      }
      return totalquantity;
    };
    return (
      <tr ng-repeat="transaction in transactions track by $index | orderBy: getTransactionDate(transaction):reverse">
        <td> {date}</td>
        <td> {total} </td>
        <td> {price}</td>
        <td> {renderQuantity(items)} </td>
        <td>
          <a class="btn btn-info" href="#/transaction/{{ transaction._id }}">
            <i class="glyphicon glyphicon-new-window" />
          </a>
        </td>
      </tr>
    );
  }
}

export default CompleteTransactions;
