import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';


class WelcomePage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let content;
    if (this.props.loggedIn){
      content =
      (<Redirect to={this.props.link}/>)
    }else{
      content =
    (
        <div >
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

    )
    }
    return (
      <div >
        {content}
      </div>
    )
  }
}

export default WelcomePage;
