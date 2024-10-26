# react-Context API 연습하기

먼저 react Context API를 다루기 전에 사용해야 되는 이유를 설명하겠습니다.

컴포넌트와 컴포넌트간의 데이터를 이동시키는 방법에는 대표적으로 Props가 있습니다.

### Props
props(property)란 상위 컴포넌트가 하위 컴포넌트에 값을 전달할 때 사용하는 속성입니다.
props 사용 예시:
( 상위 컴포넌트 )
```
function App() {
    return(
         <MyComponent propValue="헬로 리액트!">Bye 리액트!</MyComponent>
    );
}
export default App;
```

( 하위 컴포넌트로 값 이동 )
```
function MyComponent(props) {
    return(
        <div>
            {props.propValue},                   {props.children}
        </div>

    );
}
export default MyComponent;
```
결과
```
헬로 리액트! Bye 리액트!
```

Props 타입 
props의 자료형은 자바스크립트의 자료형을 모두 사용 가능합니다. 

 문자열 이외 타입의 프로퍼티 
- 문자열 타입 이외의 프로퍼티 값은 중괄호({ })를 사용합니다. 

<MyComponent 
	boolProp= {true} //boolean
	arrProp= {['a','b','c']} //배열
	objProp= {{name:'코딩젤리', title:'헬로리액트!'}} //객체
	funcProp= {() => { alert('알림창'); }}  //함수 
/>
### Prop Drilling이란?
Prop Drilling 은 props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트들을 거치면서 React Component 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정입니다.

우선 Prop Drilling 는 문제가 되지 않습니다. prop 전달이 3~5개 정도의 컴포넌트라면 말이죠.
하지만 prop 전달이 10개, 15개 같이 더 많은 과정을 거치게 된다면 어떻게 될까요? 코드를 읽을 때 해당 prop을 추적하기 힘들어집니다.
그렇기 때문에 유지보수도 더욱 어려워집니다.

### 그럼 어떻게 해야 할까?
과도한 Prop Drilling를 피하기 위해서는 여러 방법이 있습니다.


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
