import React from "react";
import SetupWizard from "../../components/SetupWizard/SetupWizard";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { About } from "../../components/AboutUs/About";
import { Questions } from "../../components/Questions/Questions";
import Results from "../../components/Results/Results";

const Routes = props => {
  return (
    <BrowserRouter>
      <nav className="App-nav">
        <span className="App-link">
          <Link to="/start" style={{ textDecoration: "none" }}>
            Take test
          </Link>
        </span>
        <span> | </span>
        <span>
          <Link to="/about" style={{ textDecoration: "none" }}>
            About us
          </Link>
        </span>
      </nav>

      <Switch>
        <Route path="/start">
          <SetupWizard></SetupWizard>
        </Route>

        <Route path="/questions">
          <Questions></Questions>
        </Route>

        <Route path="/results">
          <Results></Results>
        </Route>

        <Route path="/about">
          <About></About>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
