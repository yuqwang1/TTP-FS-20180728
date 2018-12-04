# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Watchlist.destroy_all
WatchlistJoin.destroy_all
Transaction.destroy_all
User.destroy_all
users = User.create!([{
  username:"Demo_User",
    password:"starwars",
    email:"cryptonaut@gmail.com",
    first_name:"Demo",
    last_name:"User",
    funds: 5000
  }
  ])

  Transaction.create!([{
      user_id: User.find_by(username: "Demo_User").id,
      stock_id: Stock.find_by(symbol: "BTC").id,
      price: 4444,
      amount:3
    }])
    WatchlistJoin.create!([{
        watchlist_id: User.find_by(username: "Demo_User").watchlist.id,
        stock_id: Stock.find_by(symbol: "BTC").id,
      }])
