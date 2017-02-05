import React from 'react'
import { render } from 'react-dom'

const UserGreeting = _ =>
  <h1>Welcome back!</h1>;

const GuestGreeting = _ =>
  <h1>Please sign up.</h1>;

const Greeting = props =>
  props.isLoggedIn ? <UserGreeting /> : <GuestGreeting />;

const LoginButton = props =>
  <button onClick={props.onClick}>
    Login
  </button>;

const LogoutButton = props =>
  <button onClick={props.onClick}>
    Logout
  </button>;

export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const button = this.state.isLoggedIn ?
      <LogoutButton onClick={this.handleLogoutClick} /> :
      <LoginButton onClick={this.handleLoginClick} />;

    return (
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn} />
        {button}
      </div>
    );
  }
}
