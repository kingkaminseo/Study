import { useState } from "react";
import "./App.css";
import { InputContext } from "./context";
import Child1 from "./child1";
import Child2 from "./child2";
function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="App">
      <InputContext.Provider value={{ inputValue, setInputValue }}>
        <p>엄마</p>
        <Child1 />
        <Child2 />
      </InputContext.Provider>
    </div>
  );
}

export default App;
