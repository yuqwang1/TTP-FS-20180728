import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';
import Loading from '../loading/loading';


class UserShowPage extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.findAllShares(this.props.currentUser.id);
          const shareIds = Object.keys(this.props.shares);
          const shareArr = [];
          for (var i = 0; i < shareIds.length; i++) {
            const shareId = parseInt(shareIds[i]);
              shareArr.push(shareId);
            }
          const allIds = shareArr.concat(this.props.watchlist);
          this.props.altFetchStocks(allIds);
        }





  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  render(){
    if (this.props.loading){

      return (
        <Loading />
      )
    }

    let sharelist, ownedShares,  stockslist, shareheader;
    const shareArr = Object.keys(this.props.shares);
    if (this.props.watchlist){
      let stock, price, symbol;
      let keys = Object.keys(this.props.stocks);
        if (shareArr.length > 0){
          shareheader = (
            <li>Shares</li>
          )
          stockslist = this.props.stocks;
          sharelist = this.props.shares;

         ownedShares = shareArr.map((stockId)=>{
           if (stockslist[stockId] && stockslist[stockId].USD){
             price = "$" +this.round(stockslist[stockId].USD.PRICE,5).toString();
           }
           if (stockslist[stockId]){
             return(
              <Link to={`/stocks/${stockId}`} key={stockId}>
                <ul>
                  <div>
                    <li>{stockslist[stockId].symbol}</li>
                    <li>{sharelist[stockId]} shares</li>
                  </div>
                  <li>{price}</li>
                </ul>
              </Link>
            )}
           }
         )
          }
    }

    return (
        <div>
          <NavbarContainer />
          <div>
            <h2>{this.props.currentUser.first_name} {this.props.currentUser.last_name}{"'s"} Profile</h2>
            <h2>Cash: ${this.round(this.props.currentUser.funds,4)}</h2>
          </div>
            <Link to="/stocks"></Link>
              {shareheader}
              {ownedShares}
          </div>


    )
  }
}

export default UserShowPage;
