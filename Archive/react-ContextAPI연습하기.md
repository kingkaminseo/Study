# react-Context API 연습하기

먼저 react Context API를 다루기 전에 사용해야 되는 이유를 설명하겠습니다.

먼저 react에서 컴포넌트와 컴포넌트간의 데이터를 이동시키는 방법에는 대표적으로 Props가 있습니다.

## Props
props(property)란 상위 컴포넌트가 하위 컴포넌트에 값을 전달할 때 사용하는 속성입니다.
props 사용 예시:
( 상위 컴포넌트 )
```jsx
function App() {
    return(
         <MyComponent propValue="헬로 리액트!">Bye 리액트!</MyComponent>
    );
}
export default App;
```

( 하위 컴포넌트로 값 이동 )
```jsx
function MyComponent(props) {
    return(
        <div>
            {props.propValue}, {props.children}
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
```tsx
<MyComponent 
	boolProp= {true} //boolean
	arrProp= {['a','b','c']} //배열
	objProp= {{name:'코딩젤리', title:'헬로리액트!'}} //객체
	funcProp= {() => { alert('알림창'); }}  //함수 
/>
```

## Prop Drilling이란?
Prop Drilling 은 props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트들을 거치면서 React Component 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정입니다.

우선 Prop Drilling 는 문제가 되지 않습니다. prop 전달이 3~5개 정도의 컴포넌트라면 말이죠 ㅋ.
하지만 prop 전달이 10개, 15개 같이 더 많은 과정을 거치게 된다면 어떻게 될까요? 코드를 읽을 때 해당 prop을 추적하기 힘들어집니다.
그렇기 때문에 유지보수도 더욱 어려워집니다.

## 그럼 어떻게 해야 할까?
과도한 Prop Drilling를 피하기 위해서는 여러 방법이 있습니다.


## createContext 사용
```jsx
import { createContext } from "react";

export const InputContext = createContext("");
```

### 루트컴포넌트에 저장한 Context를 불러온 후 Provider에 사용할 변수 저장시키기

ex:

```jsx
const [inputValue, setInputValue] = useState("");

<InputContext.Provider value={{ inputValue, setInputValue }}>
```

useContext를 사용하여 변수 불러오고 사용하기

```jsx
  const { inputValue } = useContext(InputContext);
```
## Redux를 권장하지 않는 이유
1. 초기 설정이 많고 복잡하기 때문입니다
	- Redux를 사용하려면 각 상태 변화를 정의하는 액션과 상태를 업데이트하는 리듀서를 구성해야 하고
	- 애플리케이션 전체에서 사용할 수 있도록 스토어를 만들어야 하며, 이 스토어를 최상위 컴포넌트에 Provider로 감싸주는 설정이 필요합니다.
2. 보일러플레이트 코드가 많습니다.
	- 상태 변경을 위한 액션 타입과 크리에이터, 리듀서 작성 등 여러 파일과 코드 구성이 필요합니다. 이로 인해 프로젝트의 초기 코드 양이 많아집니다.



이러한 방법들은 상위컴포넌트가 하위컴포넌트에게 전달하거나 같은 상위컴포넌트안에 하위컴포넌트와 하위 컴포넌트의 데이터 전달을 위해서 사용하는 것이다.
그럼 반대로 하위컴포넌트에서 상위컴포넌트로 데이터를 올려주는 방법은 없을까?

## 콜백 패턴 (Callback Pattern)  리프트 업 (Lifting State Up)
### 하위컴포넌트에서 상위컴포넌트로 데이터 올려주는 방법

하위컴포넌트에서 상위컴포넌트로 데이터를 올려주는 작업을 콜백패턴이나 리프트 업이라고 부른다.

설명: 
1. 하위 컴포넌트에서는 onSendMessage라는 함수를 실행하여 상위 컴포넌트로 메시지를 보냅니다.
2. 상위 컴포넌트에서는 이 메시지를 받아 상태를 갱신하거나 원하는 작업을 수행합니다.

EX: 
#### 하위컴포넌트
```jsx
funtion ChildrenComponent({onSendMessage}: interfaceName) {
```
```tsx
  const sendMessageToParent = () => {
    onSendMessage('data' as type);
  };
```
```tsx
<button
         onClick={() => {
         sendMessageToParent();
       }}
/>
```
```tsx
interface interfaceName {
	onSendMessage: (data: type) => void
}
```

#### 상위컴포넌트
```tsx
  const receiveMessage = (data: string) => {
    setData(data);
  };
```
```jsx
<ChildrenComponent onSendMessage={receiveMessage />
```

이런식으로 하위컴포넌트의 데이터를 상위컴포넌트로 올려서 사용할 수 있다.
jsx는 상관없겠지만 tsx로 작성할 시 타입에 주의하면서 적어야 된다.
interface 안쓰려고 as string 이런거 쓰지말고 조금 귀찮더라도 interface 추가하자. (실화임)



#### [ContextAPI 공식문서] (https://react.dev/reference/react/createContext)
