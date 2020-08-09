import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Container from "./components/Container";
// Browser  router
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/room" component={Container} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
