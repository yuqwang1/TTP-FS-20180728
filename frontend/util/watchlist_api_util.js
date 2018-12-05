

export const removeFromWatchlist = (watchlistJoin) => {
  return(
    $.ajax({
      url: `api/watchlist_joins/`,
      method: "DELETE",
      data: {
        watchlistJoin
      }
    })
  )
}
