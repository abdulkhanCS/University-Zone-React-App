import React from "react";
import LoginScreen from "./components/loginScreen.js";
import Register from "./components/register.js"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={LoginScreen} />
      <Route path="/register" exact component = {Register} />
      {/* <Route path="/create" component={CreateUser} /> */}
    </Router>
  );
}

export default App;
