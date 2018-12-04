import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';
import TransactionFormContainer from '../transaction/transaction_form_container';
import Loading from '../loading/loading';

class StockShowPage extends React.Component{
  constructor(props){
    super(props);
    this.state  = {
      timescale: "daily"
    }
  }

  componentDidMount(){
    this.props.fetchStock(this.props.match.params.stock_id);
    this.interval1 = setInterval(()=>(this.props.fetchStock(this.props.match.params.stock_id)),10000);
  }

  componentDidUpdate(oldprops){
    if (this.props.match.params !== oldprops.match.params){
      this.props.fetchStock(this.props.match.params.stock_id);
      this.props.clearSearch();
      this.props.clearData();
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval1);
    this.props.clearSearch();
    this.props.clearData();
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  clearTimescaleButtons(){
    const buttons = document.querySelectorAll(".timescale-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active-timescale");
      buttons[i].classList.remove("active-timescale-down");
      buttons[i].classList.remove("active-timescale-up");
    }
  }

  render(){
    if (!this.props.stock || !this.props.data || !document.getElementById("gradient")){
      return (
        <Loading />
      )
    }
      let initialPrice;
      let change;
      let initialChange;
      let monthly;
      let pctChange;
      let rb, gd, at, nv;
      let addedStocks;
      let button;
      let watchlistbutton, transactionbutton;

      if (this.props.data[this.state.timescale]){
        const monthData = this.props.data[this.state.timescale];
        pctChange = monthData[monthData.length-1].pctchange.toFixed(2);
        initialChange = this.round(monthData[monthData.length-1].change,8);

        const active = document.querySelector(".active-timescale");
        if (active){
          if(initialChange > 0 ){
            active.classList.remove("active-timescale-down");
            active.classList.add("active-timescale-up");
          }else{
            active.classList.add("active-timescale-down");
            active.classList.remove("active-timescale-up");
          }
        }
        if (initialChange < 0){
          nv = "nav-link-a";
          at = "active-timescale-down";
          rb = "return-button";
          gd = "gradient";
          watchlistbutton = "watchlist-button-down";
          transactionbutton = "transaction-form-btn-down";
          initialChange = `-$${initialChange.toString().slice(1)} (${pctChange}%)`;
        }else{
          nv = "nav-link-a-up";
          at = "active-timescale-up";
          rb = "return-button-up";
          gd = "gradient-up";
          watchlistbutton = "watchlist-button-up";
          transactionbutton = "transaction-form-btn-up";
          initialChange = `+$${initialChange} (${pctChange}%)`;
        }

        initialChange = initialChange
        initialPrice = "$" + monthData[monthData.length-1].close;
        monthly = this.props.data[this.state.timescale].slice(1);
      }else{
        gd = "gradient";
        initialPrice = "Loading";
        change="Loading";
        pctChange = "Loading";
        initialChange = "Loading";
        button = <button>Loading</button>
      }
      return (
        <div>
          <div id="gradient"></div>
          <NavbarContainer navlink={nv}/>
            <Link to="/stocks"></Link>
              <h1 id="stockLabel">{this.props.stock.name}</h1>
              <h1 id="pricelabel">{initialPrice}</h1>
              <h2 id="pctChangeLabel">{initialChange}</h2>
              <TransactionFormContainer button={transactionbutton} stock={this.props.stock}/>
              {button}
            </div>
      )

  }
}

export default StockShowPage;
