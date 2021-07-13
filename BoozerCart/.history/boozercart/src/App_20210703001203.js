import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./components/Context/BookContext";
import { BorwserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router></Router>
      <Switch>
        <Route path={"/navbar/"} component={NavBar}></Route>
        <Route path={"/home/"} component={HomeIndex}>
          <BookContextProvider>
            <HomeIndex />
          </BookContextProvider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
