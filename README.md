# react-Context API 연습하기

### createContext 사용

```
import { createContext } from "react";

export const InputContext = createContext("");
```

### 루트컴포넌트에 저장한 Context를 불러온 후 Provider에 사용할 변수 저장시키기

ex:

```
const [inputValue, setInputValue] = useState("");

<InputContext.Provider value={{ inputValue, setInputValue }}>
```

useContext를 사용하여 변수 불러오고 사용하기

```
  const { inputValue } = useContext(InputContext);
```
