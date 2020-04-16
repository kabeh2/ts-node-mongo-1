import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import "./App.scss";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import AddTask from "./components/pages/AddTask";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/add" component={AddTask} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
