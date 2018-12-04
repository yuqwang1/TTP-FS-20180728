import React from 'react';
import {withRouter} from 'react-router-dom';
import {merge} from 'lodash';

class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({},this.state);
    this.props.processForm(user);
    this.setState({
      username: "",
      password: ""
    });
  }

  update(field){
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  renderErrors(){
    return (
      <ul>
        {this.props.errors.map((error,i)=>(
          <li key={i}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render(){
    return(
      <div>
            <h2>Sign In</h2>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label>Email or Username </label><br/>
              <input type="text" onChange={this.update("username")} value={this.state.username} required></input><br/>
              <label>Password </label><br/>
              <input type="password" onChange={this.update("password")} value={this.state.password} required></input><br/>
              {this.props.link}<br/>
            <br/>
              <span onClick={this.props.demoLogin}>Demo Login</span>
              <br/>
              {this.renderErrors()}
              <input type="submit" value={this.props.button}/><br/>
            </form>
          </div>



    )
  }
}

export default withRouter(LoginForm);
