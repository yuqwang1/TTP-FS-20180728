import * as WatchlistApiUtil from '../util/watchlist_api_util';

export const RECEIVE_WATCHLIST_JOIN = "RECEIVE WATCHLIST_JOIN";

export const receiveWatchlistJoin = (watchlistJoin) => {
  return (
    {
      type: RECEIVE_WATCHLIST_JOIN,
      watchlistJoin
    }
  )
}
