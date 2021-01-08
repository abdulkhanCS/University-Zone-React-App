import React from "react";
import "../componentStyles/loginScreen.css";
import { Link, useParams } from "react-router-dom";
import Redirect from "react-router";
import Axios from "axios";

export default class loginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      data: null,
      loggedIn: false
    };
    this.failedToLogin.bind(this);
  }

  assign(e) {
    if (e.target.name === "username") {
      this.setState({ username: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    const thisUsername = this.state.username;
    Axios.get("/user/", {
      params: {
        username: thisUsername
      },
    }).then((response) => {
      console.log(response.status);
      this.setState({data: response.data[0]});
      if (this.state.data != null) { // user name found
        const bcrypt = require("bcryptjs");
        console.log(this.state.password, " + ", this.state.data.password);
        return new Promise((resolve, reject) => {
          bcrypt.compare(
            this.state.password,
            this.state.data.password,
            function (err, result) {
              if (err) reject(err);
              resolve(result);
            }
          );
        }).then((result) => {
          if (result) { //logged in 
            this.setState({loggedIn: true})
            const loginCircle = document.getElementById("login");
            loginCircle.setAttribute("style", "border: solid green");
            setTimeout(() => {
              this.props.history.push({
              pathname: '/homepage',
              state: { thisUsername: this.state.username, thisUser: this.state.data, isLoggedIn: true }
              }); 
            }, 400);
          } else {
            this.failedToLogin(); 
          }
        });
      } else {
        this.failedToLogin()
        console.log("No matching user found");
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  isLoggedIn(){
    return this.state.loggedIn
  }

  failedToLogin() {
    const loginCircle = document.getElementById("login");
    loginCircle.setAttribute("style", "border: solid red");
  }

  render() {
    return (
     <div id = "login-wrap">
       <div id = "university-zone-text">
          University Zone
       </div>
      <div id="login">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="credentials"
          onChange={this.assign.bind(this)}
        ></input>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="credentials"
          onChange={this.assign.bind(this)}
        ></input>
        <div id="buttons">
          <div id="login-button" onClick={this.onSubmit.bind(this)}>
            Log in
          </div>
          <Link to="/user/register" id="register-button">
            Register
          </Link>
        </div>
      </div>
      </div> 
    );
  }
}
