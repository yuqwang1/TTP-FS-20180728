import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import Loading from '../loading/loading';
import TransactionFormContainer from '../transaction/transaction_form_container';

class TransactionForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user_id: this.props.currentUser.id,
      stock_id: this.props.stock.id,
      price: "",
      amount: "",
      cost: "0",
      sell: false
    }
  }

  componentDidMount(){
    const currentUserId = this.props.currentUser.id;
    const currentStockId = this.props.stock.id;
    const func = this.props.findShares;
    this.props.fetchPrice(this.props.stock.symbol,this.props.stock.id);
    this.props.findShares(currentUserId,currentStockId);
  }

  handleSubmit(e){
    e.preventDefault();
    const transaction = Object.assign({},this.state);
    transaction.price = this.props.data.price;
    transaction.amount = parseInt(transaction.amount);

      if (this.props.currentUser.funds > transaction.amount*transaction.price){
        this.props.addTransaction(transaction,this.props.currentUser);
      }

    this.setState({
      user_id: this.props.currentUser.id,
      stock_id: this.props.stock.id,
      price: "",
      amount: "",
      funds: this.props.currentUser.funds
    });
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }


  update(field){
    return (e) => this.setState({
      [field]: e.target.value,
      cost: `$${this.round((e.target.value*this.props.data.daily[this.props.data.daily.length-1].close),4)}`
    });
  }

  render(){
    let price, shares;
    if (this.props.data.daily){
      price = this.props.data.daily[this.props.data.daily.length-1].close;
    }else{
      price = "loading";
    }
    if (this.state.sell === false){
      shares = (
        <h2>${this.round(this.props.currentUser.funds,4)} Cash Available</h2>
      )
    }

    return(
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h2 onClick={()=>this.setState({sell: false})}>Buy</h2>
            <h2>Shares</h2>
            <input type="number" min="1" max="500000" onChange={this.update("amount")} value={this.state.amount} placeholder="0" required></input>
            <h2>Market Price: </h2>
            <h2>{price}</h2>
            <h2>Estimated Cost:</h2>
            <h2> {this.state.cost}</h2>
          <input type="submit" value='Buy'></input>
            {shares}
          </form>
        )

  }
}

export default TransactionForm;
