import mainImg from "./assets/1secretimg.png";
import br from "./assets/br.png";
import logo from "./assets/logo.png";
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomePage from "./component/homepage.js";
import LinkPage from "./component/linkpage.js";
import ErrorPage from "./component/errorpage.js";
import ReceivedLink from "./component/receivedlink.js";

const App = () => (
  <div className="app">
    <img src={logo} alt="1Secret" class="logo" />
    <Main />
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/link" component={Link}></Route>
    <Route exact path="/expired" component={Expired}></Route>
    <Route exact path="/receivedlink" component={Received}></Route>
    <Route exact component={PageNotFound}></Route>
  
  </Switch>
);

const Home = () => (
  <div className="home center">
    <Container>
      <Row>
        <Col>
          <HomePage></HomePage>
        </Col>
        <Col>
          <img src={mainImg} alt="main-img" class="mainpage-img center" />
        </Col>
      </Row>
    </Container>
  </div>
);

const Link = (props) => (
  <div>
    <div className="link center">
      <LinkPage data={props.location.state.data}></LinkPage>
    </div>
    <img src={br} alt="br" class="bottom-right" />
  </div>
);

const Expired = () => (
  <div className="expired">
    <h1>This link has expired.</h1>
  </div>
);

const PageNotFound = () => (
  <div className="error">
    <ErrorPage></ErrorPage>
    <p></p>
  </div>
);

const Received = () => (
  <div>
    <div className="link center">
      <ReceivedLink></ReceivedLink>
    </div>
    <img src={br} alt="br" class="bottom-right" />
  </div>
);

export default App;
