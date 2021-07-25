import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./components/Context/BookContext";
import { BorwserRouter, Switch, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BookContextProvider>
          <NavBar></NavBar>
          <HomeIndex />
        </BookContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
