import React from "react";
import "../componentStyles/register.css";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class register extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      admin: true,
    };
    this.onSubmit.bind(this);
    this.assign.bind(this);
    this.register.bind(this);
    this.hashPassword.bind(this);
    this.getPassword.bind(this);
  }

  assign(e) {
    console.log("change");
    if (e.target.name === "first-name") {
      this.setState({ firstName: e.target.value });
    }
    if (e.target.name === "last-name") {
      this.setState({ lastName: e.target.value });
    }
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    }
    if (e.target.name === "username") {
      this.setState({ username: e.target.value });
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  }

  async getPassword(password) {
    await this.hashPassword(password)
      .then((hash) => {
        console.log("at getPass it is ", hash);
        this.setState({ password: hash });
      })
      .catch((err) => {
        console.log("at getPassword", err);
      });
  }

  hashPassword(password) {
    console.log("hashing is ", password);
    const bcrypt = require("bcryptjs");
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) reject(err);
        console.log("at hashPassword", hash);
        resolve(hash);
      });
    });
  }
  async onSubmit(e) {
    e.preventDefault();
    await this.getPassword(this.state.password);
    console.log("at submit ", this.state.password);
    this.register();
  }

  register() {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      admin: false,
    };
    console.log(user);
    Axios.post("/user/register", user).then((res) => console.log(res.data));
  }

  render() {
    return (
      <div id="register-wrap">
        <div id="join-text">Join</div>
        <form id="register-box">
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="First Name"
            className="user-info"
            onChange={this.assign.bind(this)}
          ></input>
          <input
            type="text"
            name="last-name"
            id="last-name"
            placeholder="Last Name"
            className="user-info"
            onChange={this.assign.bind(this)}
          ></input>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="user-info"
            onChange={this.assign.bind(this)}
          ></input>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="user-info"
            onChange={this.assign.bind(this)}
          ></input>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="user-info"
            onChange={this.assign.bind(this)}
          ></input>
          <input
            type="submit"
            id="submit-registration"
            onClick={this.onSubmit.bind(this)}
          ></input>
        </form>
      </div>
    );
  }
}
