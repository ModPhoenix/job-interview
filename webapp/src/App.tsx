import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { QuestionsPage } from "./features/questions";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/questions">
            <QuestionsPage />
          </Route>
          <Route path="/">
            <div>home</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
