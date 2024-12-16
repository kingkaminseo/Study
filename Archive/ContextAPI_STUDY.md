# 리프트업 양방향 데이터바인딩, 분기처리 공부하기 ( Props, ContextAPI )

Props와 ContextAPI를 사용하여 데이터를 리프트업 시키고 이후 처리하는 로직을 만들어 보고 싶었다.


### 만들고 싶었던 것 예시 사진
![image](https://github.com/user-attachments/assets/abad9480-f90c-4e5a-8799-72073ef48789)

이런식으로 낱개로 데이터를 받아 회원가입 폼을 구현하려 할 떄 각 컴포넌트 별로 만들어야 하며 이 각각의 하위 컴포넌트에서 발생된 데이터를
부모데이터로 모아 JSON으로 만들어 API로 보내야 한다.

이런 느낌 비스무리 하게 만들어 보았다.

## 설명
두개의 하위 컴포넌트에 하나는 이름, 또 다른 하나는 나이 정보를 받을 수 있게 하였다. <br />
이를 부모태그로 올려준 후 객체로 저장하여 만약 이름이 '김민서' 이고 나이가 '19'라고 입력하였다면 특정 사용자라고 판단하여
프롭으로 모든 UI를 제거 후 환영문구를 띄우도록 만들어 보았다.

## 코드 설명


```ts
import React, { createContext } from "react";

interface IInputContextTypes {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const InputTextContext = createContext<IInputContextTypes>(
  {} as IInputContextTypes
);

interface IInputNumberTypes {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const InputNumberContext = createContext<IInputNumberTypes>(
  {} as IInputNumberTypes
);

```
App.tsx
```tsx
import { useState } from "react";
import "./App.css";
import Childrens from "./components/Childrens";
import Props from "./components/Prop";
import { InputNumberContext, InputTextContext } from "./Context";

function App() {
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);
  const [json, setJson] = useState<{ 이름: string; 나이: number }[]>([]);
  const [success, setSuccess] = useState(false);
  function make() {
    setJson([{ 이름: text, 나이: number }]);
    if (text == "김민서" && number === 19) {
      setSuccess(true);
    }
  }

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          display: success ? "none" : "block",
        }}
      >
        <h3>엄마</h3>
        {json && (
          <span>
            {json.map((data) => (
              <>
                <p>{data.이름}</p>
                <p>{data.나이}</p>
              </>
            ))}
          </span>
        )}
        <button style={{ border: "1px solid black" }} onClick={make}>
          make json
        </button>
        <p></p>
      </div>
      <InputTextContext.Provider value={{ text, setText }}>
        <InputNumberContext.Provider value={{ number, setNumber }}>
          <Props successData={success} />
          <Childrens successData={success} />
        </InputNumberContext.Provider>
      </InputTextContext.Provider>
      {success && <h1>안녕하세요.</h1>}
      <a href="">asdf</a>
    </>
  );
}

export default App;

```

Prop.tsx
```tsx
import { useContext } from "react";
import { InputTextContext } from "../Context";

interface IPropsTypes {
  successData: boolean;
}

function Props({ successData }: IPropsTypes) {
  const { setText } = useContext(InputTextContext);
  return (
    <div
      style={{
        border: "1px solid black",
        display: successData ? "none" : "block",
      }}
    >
      <h3>하위컴포넌트</h3>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="이름을 입력하세요."
      />
    </div>
  );
}

export default Props;

```

Childrens.tsx
```tsx
import { useContext } from "react";
import { InputNumberContext } from "../Context";

interface IChildrensProps {
  successData: boolean;
}

function Childrens({ successData }: IChildrensProps) {
  const { setNumber } = useContext(InputNumberContext);
  return (
    <div
      style={{
        border: "1px solid black",
        display: successData ? "none" : "block",
      }}
    >
      <h3>하위컴포넌트 2</h3>
      <input
        type="number"
        onChange={(e) => {
          setNumber(Number(e.target.value));
        }}
      />
    </div>
  );
}

export default Childrens;

```

리프트업 할 2개의 ContextAPI를 생성하고 타입을 정의하였다. <br />이후 App.tsx에서 하위컴포넌트들에게 알맞은 전역변수를 내려주고 하위 컴포넌트에서는 이 전역변수를 사용해 바인딩하여 사용할 수 있게 하였다. <br />
이후 버튼을 누르면 이 2개의 데이터를 객체로 만들고 map()을 사용하여 유저에게 뷰로 보여주도록 구현하였다. <br /> 이떄 이름을 '김민서' 이고 나이를 '19'세라고 입력하였다면 useState를 사용하여  값을 담게 되면 리렌더링되어
프롭으로 모든 하위 컴포넌트 들에게 `true` 데이터를 Props로 내려주어 뷰를 삭제시키도록 구현하였다. <br />
이후 부모컴포넌트인 App.tsx의 뷰까지 삭제시키고 `안녕하세요.` 라는 문구를 띄우도록 구현시켜 보았다.

## Views
기본 뷰 화면이다. 보기 쉽게 하위컴포넌트와 상위 컴포넌트가 뭔지 구분시켜 보았다.
![image](https://github.com/user-attachments/assets/5ac38699-d537-43a5-9ba6-0e2c6ca4b259)

이름과 나이를 입력했을 떄 대충 이런식으로 나온다.
![image](https://github.com/user-attachments/assets/fe941ac7-7410-4bad-be60-2f01852c1e1c)

지정된 이름과 나이를 입력했을 때 올바르게 작동되는 것을 볼 수 있다.
![image](https://github.com/user-attachments/assets/e27ee02c-6b51-43b6-b923-0133f80f92de)


## 느낀점
데이터 set 타입을 React.Dispatch<React.SetStateAction<type ( ex: string )>>; 이런식으로 정의할 수 있다 사실을 깨닳고 감격의 React 만세운동을 시작하였다. <br />
참고 https://stackoverflow.com/questions/73857656/ts2322-type-username-string-setusername-react-dispatchreact-setstateacti
