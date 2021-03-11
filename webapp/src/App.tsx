import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { SignInPage } from "./features/auth";
import { QuestionsPage } from "./features/questions";
import { Path } from "./settings";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path={Path.signIn} component={SignInPage} />
          <Route path={Path.questions} component={QuestionsPage} />
          <Route path={Path.home}>
            <div>home</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
