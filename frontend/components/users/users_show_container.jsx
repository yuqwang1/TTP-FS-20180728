import React from 'react';
import {connect} from 'react-redux';
import UserShowPage from './users_show_page';
import {logout} from '../../actions/session_actions';
import {clearData, altFetchStocks} from '../../actions/stocks_actions';
import {findAllShares} from '../../actions/transaction_actions';

const msp = state => {
  return (
    {
      loggedIn: Boolean(state.session.id),
      currentUser: state.entities.users[state.session.id],
      watchlist: state.entities.watchlist,
      loading: state.ui.loading,
      stocks: state.entities.stocks,
      shares: state.entities.shares
    }
  )
};

const mdp = dispatch => (
  {

    logout: () => dispatch(logout()),
    altFetchStocks: (watchlist) => dispatch(altFetchStocks(watchlist)),
    clearData: ()=> dispatch(clearData()),
    findAllShares: (id) => dispatch(findAllShares(id))
  }
);


export default connect(msp,mdp)(UserShowPage);
