import React from 'react';
import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStock, fetchPrice} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return (
    {
      stock: state.entities.stocks[ownProps.match.params.stock_id],
      currentUser: state.entities.users[state.session.id],
      data: state.entities.data,
      loading: state.ui.loading
    }
  )
}


const mdp = dispatch => (
  {
    fetchStock: id => dispatch(fetchStock(id)),
    logout: () => dispatch(logout()),
  }
);


export default connect(msp,mdp)(StockShow);
