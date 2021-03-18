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
      <Main />
    </div>
  );
}
export default App;
