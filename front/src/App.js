import logo from "./logo.svg";
import "./App.css";
import { NavLink, Switch, Route } from "react-router-dom";

const App = () => (
  <div className="app">
    <h1>1Secret</h1>
    <Main />
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/link" component={Link}></Route>
    <Route exact path="/expired" component={Expired}></Route>
    <Route exact path="/viewlink" component={ViewLink}></Route>
  </Switch>
);

const Home = () => (
  <div className="home">
    <h1>Welcome to my portfolio website</h1>
    <p> Feel free to browse around and learn more about me.</p>
    <NavLink exact activeClassName="current" to="/link">
      Generate Link
    </NavLink>
  </div>
);

const Link = () => (
  <div className="link">
    <NavLink exact activeClassName="current" to="/">
      Generate Another Link
    </NavLink>
    <h1>Link</h1>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias?
    </p>
    <p>
      Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident
      corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum
      molestias? 
    </p>
  </div>
);

const Expired = () => (
  <div className="expired">
    <h1>This link has expired.</h1>
  </div>
);

const ViewLink = () => (
  <div className="viewlink">
    <h1>You've received a secret.</h1>
    <p>Your password will disappear in __ minutes</p>
  </div>
);

export default App;
