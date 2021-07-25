import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./components/Context/BookContext";
import { BorwserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter></BrowserRouter>
      <BookContextProvider>
        <NavBar></NavBar>
        <HomeIndex />
      </BookContextProvider>
    </div>
  );
}

export default App;
