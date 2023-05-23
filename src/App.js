import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

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