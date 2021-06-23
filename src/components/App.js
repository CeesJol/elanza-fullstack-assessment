// Starting point
// https://reactrouter.com/web/example/basic

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import New from "./New";
import OpenRequests from "./OpenRequests";
import Request from "./Request";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">New</Link>
          </li>
          <li>
            <Link to="/open-requests">Open Requests</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/open-requests">
            <OpenRequests />
          </Route>
          <Route path="/requests/:id" component={Request} />
        </Switch>
      </div>
    </Router>
  );
}
