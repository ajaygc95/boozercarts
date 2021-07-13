import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./components/Context/BookContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import GlobalStyle from "./globalStyles";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Accounts/Register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <GlobalStyle />
        <NavBar></NavBar>
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/sign-up" exact component={Register}></Route>
          <Route path="/user-auth" exact component={Register}></Route>
          <Route path={"/home/"} component={HomeIndex}>
            <BookContextProvider>
              <HomeIndex />
            </BookContextProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
