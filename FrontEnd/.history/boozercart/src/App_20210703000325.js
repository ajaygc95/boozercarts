import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./components/Context/BookContext";

function App() {
  return (
    <div className="App">
<Bro
      <BookContextProvider>
              <NavBar></NavBar>
        <HomeIndex />
      </BookContextProvider>
    </div>
  );
}

export default App;
