import React from 'react';
import {connect} from 'react-redux';
import UserShowPage from './users_show_page';
import {logout} from '../../actions/session_actions';
import {watchlistDataFetch, clearData, altFetchStocks, altFetchStocksData} from '../../actions/stocks_actions';
import {doneLoading, needsLoading} from '../../actions/ui_actions';
import {findAllShares} from '../../actions/transaction_actions';

const msp = state => {
  return (
    {
      loggedIn: Boolean(state.session.id),
      currentUser: state.entities.users[state.session.id],
      watchlist: state.entities.watchlist,
      loading: state.ui.loading,
      stocks: state.entities.stocks,
      news: state.entities.news,
      shares: state.entities.shares
    }
  )
};

const mdp = dispatch => (
  {
    
    logout: () => dispatch(logout()),
    doneLoading: () => dispatch(doneLoading()),
    altFetchStocks: (watchlist) => dispatch(altFetchStocks(watchlist)),
    needsLoading: () => dispatch(needsLoading()),
    clearData: ()=> dispatch(clearData()),
    altFetchStocksData: (syms) => dispatch(altFetchStocksData(syms)),
    findAllShares: (id) => dispatch(findAllShares(id))
  }
);


export default connect(msp,mdp)(UserShowPage);