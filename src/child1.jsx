import { useContext } from "react";
import "./App.css";
import { InputContext } from "./context";
function Child1() {
  const { setInputValue } = useContext(InputContext);

  function change(e) {
    setInputValue(e.target.value);
  }
  return (
    <div className="App">
      <p>자식1</p>
      <input type="text" onChange={change} />
    </div>
  );
}

export default Child1;
