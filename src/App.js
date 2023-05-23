import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
// import About from "./pages/About";
//import Index from "./pages/Index.js";


function App() {
  console.log(process.env.REACT_APP_BASE_URL)
  return (
    <div className="App">
      <Header />
      <Main />
      
      
    </div>
  );

}

export default App;