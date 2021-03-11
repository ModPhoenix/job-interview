import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { SignInPage } from "./features/auth";
import { QuestionsPage } from "./features/questions";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/questions" component={QuestionsPage} />
          <Route path="/">
            <div>home</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
