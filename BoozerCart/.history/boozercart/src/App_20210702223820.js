import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./components/Context/BookContext";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <HomeIndex></HomeIndex>
      <BookContextProvider>
        
      </BookContextProvider>
    </div>
  );
}

export default App;
