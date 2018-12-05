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
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval1);
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  render(){
    if (!this.props.stock || !this.props.data){
      return (
        <Loading />
      )
    }
      let initialPrice;
      let change;
      let initialChange;
      let pctChange;
      let addedStocks;
      let button;

      if (this.props.data[this.state.timescale]){
        const dailyData = this.props.data[this.state.timescale];
        pctChange = dailyData[dailyData.length-1].pctchange.toFixed(2);
        initialChange = this.round(dailyData[dailyData.length-1].change,8);

        if (initialChange < 0){
          initialChange = `-$${initialChange.toString().slice(1)} (${pctChange}%)`;
        }else{
          initialChange = `+$${initialChange} (${pctChange}%)`;
        }

        initialChange = initialChange
        initialPrice = "$" + dailyData[dailyData.length-1].close;
      }else{
        initialPrice = "Loading";
        change="Loading";
        pctChange = "Loading";
        initialChange = "Loading";
        button = <button>Loading</button>
      }
      return (
        <div>
          <NavbarContainer/>
            <Link to="/stocks"></Link>
              <h1 id="stockLabel">{this.props.stock.name}</h1>
              <h1 id="pricelabel">{initialPrice}</h1>
              <h2 id="pctChangeLabel">{initialChange}</h2>
              <TransactionFormContainer stock={this.props.stock}/>
              {button}
            </div>
      )

  }
}

export default StockShowPage;
