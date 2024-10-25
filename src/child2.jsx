import "./App.css";
import { InputContext } from "./context";
import { useContext } from "react";
function Child2() {
  const { inputValue } = useContext(InputContext);
  return (
    <div className="App">
      <p>자식2</p>
      {inputValue}
    </div>
  );
}

export default Child2;
