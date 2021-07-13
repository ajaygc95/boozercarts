import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./components/Context/BookContext";
import {BorwserRouter}

function App() {
  return (
    <div className="App">
<Browser
      <BookContextProvider>
              <NavBar></NavBar>
        <HomeIndex />
      </BookContextProvider>
    </div>
  );
}

export default App;
