export const fetchStocks = () => (
  $.ajax({
    url: "api/stocks",
    method: "GET",
  })
);

export const queryStocks = (query) => (
  $.ajax({
    url: `api/stocks/search/${query}`,
    method: "GET"
  })
)

export const fetchStock = (id) => (
  $.ajax({
    url: `api/stocks/${id}`,
    method: "GET"
  })
)

export const fetchPrice = (sym) => (
  $.ajax({
    url: `https://min-api.cryptocompare.com/data/price?fsym=${sym}&tsyms=USD`,
    method: "GET",

  })
)

export const altFetchStocksData = (symbols) => {
  const syms = symbols.map((arr)=>(arr[0])).join(",");
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${syms}&tsyms=USD`,
      method: "GET",
    })
  )
}

export const fetchStocksData = (symbols) => {
  const syms = symbols.map((arr)=>(arr[0])).join(",");

  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${syms}&tsyms=USD`,
      method: "GET",

    })
  )
}

export const fetchStockDaily = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histominute?fsym=${sym}&tsym=USD&limit=1441`,
      method: "GET",

    })
  )
}

export const altFetchStockDaily = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histohour?fsym=${sym}&tsym=USD&limit=25`,
      method: "GET",

    })
  )
}

export const fetchStockWeekly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histohour?fsym=${sym}&tsym=USD&limit=169`,
      method: "GET",

    })
  )
}

export const fetchStockMonthly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=31`,
      method: "GET",

    })
  )
}

export const fetchStockTriMonthly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=93`,
      method: "GET",

    })
  )
}


export const fetchStockYearly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=365`,
      method: "GET",

    })
  )
}

export const fetchStockFiveYearly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=1825`,
      method: "GET",

    })
  )
}
