import "./App.css";
import Main from "./components/Main.js";
let inputVal = "";

function App() {
  function inputValue(e) {
    inputVal = e.target.value;
    console.log(inputVal);
  }
  return (
    <div>
      <header>
        {" "}
        <img
          src="https://raw.githubusercontent.com/omariosouto/pokedex/master/docs/logo.png"
          alt="logo"
        ></img>{" "}
      </header>
      <Main />
    </div>
  );
}
export default App;
