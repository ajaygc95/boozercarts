import NavBar from "./components/NavBar/NavBar";
import HomeIndex from "./components/HomePage/HomeIndex";
import BookContextProvider from "./compo";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BookContextProvider>
        <HomeIndex></HomeIndex>
      </BookContextProvider>
    </div>
  );
}

export default App;
