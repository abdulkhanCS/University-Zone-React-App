import React from "react";
import "../componentStyles/register.css";
import { Link } from "react-router-dom";

export default class register extends React.Component {
  constructor(){
      super()
      this.state = {
        firstName: "",
        lastName: "",
        email: "", 
        username: "",
        password: ""
      }
  }

assign(e){
  if(e.target.name === "first-name"){
    console.log("change")
    this.setState({firstName: e.target.value})
  }
  if(e.target.name === "last-name"){
    this.setState({lastName: e.target.value})
  }
  if(e.target.name === "email"){
    this.setState({email: e.target.value})
  }
  if(e.target.name === "username"){
    this.setState({username: e.target.value})
  }
  if(e.target.name === "password"){
    this.setState({password: e.target.value})
  }
}

  onSubmit(e){
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }
    console.log("Submitted")
    
  }

  render() {
    return (
      <div id="view">
        <div id="join-text">Join</div>
        <form id="register-box" method = "POST" action = "/user/register">
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="First Name"
            className="user-info"
            onChange = {this.assign.bind(this)}
          ></input>
          <input
            type="text"
            name="last-name"
            id="last-name"
            placeholder="Last Name"
            className="user-info"
            onChange = {this.assign.bind(this)}
          ></input>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="user-info"
            onChange = {this.assign.bind(this)}
          ></input>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="user-info"
            onChange = {this.assign.bind(this)}
          ></input>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="user-info"
            onChange = {this.assign.bind(this)}
          ></input>
          <input type = "submit" id="submit-registration"></input>
        </form>
      </div>
    )
  }

}


