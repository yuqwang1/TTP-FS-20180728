import {combineReducers} from 'redux';
import UsersReducer from './users_reducer';
import StocksReducer from './stocks_reducer';
import DataReducer from './data_reducer';
import WatchlistsReducer from './watchlists_reducer';
import TransactionReducer from './transactions_reducer';

export default combineReducers({
  users: UsersReducer,
  stocks: StocksReducer,
  data: DataReducer,
  watchlist: WatchlistsReducer,
  shares: TransactionReducer
});
