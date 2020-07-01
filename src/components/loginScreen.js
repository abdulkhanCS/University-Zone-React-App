import React from "react";
import "../componentStyles/loginScreen.css";
import { Link } from "react-router-dom";

export default class loginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  register(){
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    window.alert("Hello");

    // login(user).then((res) => {
    //   if (res) {
    //     // this.props.history.push("/home");
    //   }
    // });
  }

  render() {
    return login();
  }
}

const login = () => {
  return (
    <div id="login">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        className="credentials"
      ></input>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="credentials"
      ></input>
      <div id="buttons">
        <div id="login-button" onclick={() => this.onSubmit()}>
          Log in
        </div>
        <Link to = "/register" id="register-button">
          Register
        </Link>
      </div>
    </div>
  );
};
