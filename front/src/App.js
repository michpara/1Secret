import mainImg from "./assets/1secretimg.png";
import br from "./assets/br.png";
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomePage from "./component/homepage.js";
import LinkPage from "./component/linkpage.js";

const App = () => (
  <div className="app">
    <h1 style={{ "text-align": "center" }}>1Secret</h1>
    <Main />
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/link" component={Link}></Route>
    <Route exact path="/expired" component={Expired}></Route>
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

const Link = () => (
  <div>
    <div className="link center">
      <LinkPage></LinkPage>
    </div>
    <img src={br} alt="br" class="bottom-right" />
  </div>
);

const Expired = () => (
  <div className="expired">
    <h1>This link has expired.</h1>
  </div>
);

export default App;
