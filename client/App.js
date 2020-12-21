import React from "react";
import LoginScreen from "./components/loginScreen.js";
import Register from "./components/register.js"
import Homepage from "./components/homepage.js"
import CollegeForum from "./components/collegeForum.js"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component = {LoginScreen} />
      <Route path="/user/register" exact component = {Register} />
      <Route path="/homepage" exact component = {Homepage} />
      <Route path="/forum" exact component = {CollegeForum} />
    </Router>
  );
}

export default App;
