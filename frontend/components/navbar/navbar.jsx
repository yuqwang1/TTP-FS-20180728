import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';



class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      enter: false,
      link: ""
    }
  }

  handleSearch(e){
    if (e.target.value.length > 0){
      this.props.queryStocks(e.target.value);
    }else{
      this.props.clearSearch();
    }
  }

  handleKeyPress(e){
    if (this.props.search && this.props.search.length > 0){
      if (e.key === "Enter"){
        this.setState({
          enter: true,
          link : `/stocks/${this.props.search[0].id}`
        })
      }
    }
  }

  renderSearch(){
    if (this.props.search && this.props.search.length>0){
      let string = "";
      let query = this.props.query;
      const items = this.props.search.map((object,i)=>{
        let namestring = ""
        for (var i = 0; i < query.length && i < object.name.length; i++) {
          if (object.name[i].toLowerCase() === query[i].toLowerCase()){
            namestring = namestring + object.name[i]
          }else{
            i = 100;
          }
        }
        let symbolstring = ""
        for (var i = 0; i < query.length && i < object.symbol.length; i++) {
          if (object.symbol[i].toLowerCase() === query[i].toLowerCase()){
            symbolstring = symbolstring + object.symbol[i]
          }else{
            if (i>symbolstring.length){
              symbolstring = "";
            }
            i = 100;
          }
        }
        if (namestring.length>symbolstring.length){
          symbolstring = "";
        }
        if (symbolstring.length > namestring.length){
          namestring = "";
        }
        return (
          <Link to={`/stocks/${object.id}`} key={object.id}>
            <span><span>{symbolstring}</span>
              {object.symbol.slice(symbolstring.length)}</span>
            <span><span>{namestring}</span>
              {object.name.slice(namestring.length)}</span>
          </Link>
        );
      });
      return (
        <ul>
          <li >{items}</li>
        </ul>
      )
    }
  }

  render(){
    if (this.props.navlink){
      this.navlink = this.props.navlink;
    }else{
      this.navlink = "nav-link-a";
    }
    if (this.state.enter){
      return(
        <Redirect to={this.state.link}/>
      )
    }
    return(
      <div>
          <Link to="/"></Link>
            <input type="text" placeholder="Search" onKeyPress={this.handleKeyPress} onChange={this.handleSearch}></input>
            {this.renderSearch()}
            <Link id="navlink" to="/" >Home</Link>
            <button id="navlink" onClick={this.props.logout}>Log Out</button>
        </div>
    )
  }
}

  export default Navbar;
