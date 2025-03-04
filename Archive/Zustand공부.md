# Zustand에 대해서🐻
![bear](https://github.com/user-attachments/assets/114bfeab-4d82-41ec-840b-96018155aa29)

### Zustand란?
Zustand는 React의 최신 상태관리 라이브러리 이다.<br/>
작은 크기와 빠른 속도와 적은 보일러플레이트 코드 등의 여러 장점으로 많은 개발자로부터 사랑을 받고 있다.

<br/>

## Redux Vs Zustand
### Zustand 장점
1. 매우 가벼운 라이브러리를 가지고 있음.
     - Zustand: 1.1kb
     - Redux: 4.7kb
2. 적은 보일러플레이트 코드 (create 임포트만 해도 내장 set함수등을 사용할 수 있음.)
3. Context API나 Redux 처럼 Provider가 필요 없음.
4. 최소한의 리렌더링만 함.
5. 비동기 처리가 쉬움
     - 옆동네 Redux는 Redux-saga라고 그거를 또 써줘야 함 ㅋ

### 단점
1. Redux와 달리 상태 변경을 위한 리듀서와 액션 개념이 없음
     - 복잡한 로직하기 살짝 까다로움
2. 이미 Redux가 표준화 되어있어 대규모 프로젝트에 사용하기 안좋을 수 있음

<br/>
<br/>

안쓸 이유가 없는 짱짱 Zustand의 사용법에 대해 알아보겠습니다. <br/>
~~리덕스나 상태관리 라이브러리에 대해서는 자세히 풀지 않겠습니다. 다른데가서 공부하쇼~~

## Zustand 사용하기

### 설치하기
```bash
npm install zustand
```

### Store 만들기
```tsx         
import { create } from "zustand";

interface IStoreTypes {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const useCountStore = create<IStoreTypes>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set((state) => ({ count: 0 })),
}));

export default useCountStore;
```
### get 파라미터 사용하여 Store 만들기
```tsx
import { create } from "zustand";

interface IStoreTypes {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const useCountStore = create<IStoreTypes>((set, get) => ({
  count: 0,
  increase: () => {
    const { count } = get();
    set({ count: count + 1 });
  },
  decrease: () => {
    const { count } = get();
    set({ count: count - 1 });
  },
  reset: () => {
    set({ count: 0 });
  },
}));

export default useCountStore;

```
get 함수를 호출하면, 상태와 액션을 가진 스토어 객체(state)를 불러올 수 있다.
set 함수를 호출(변경할 상태를 속성으로 포함한 객체를 전달)하면, 상태를 변경할 수 있다.

### 컴포넌트에 바인딩하여 사용하기
#### 권장 X
```tsx
function Counter() {
  const { count } = useCountStore()
  return (
    <div>
      <span>{count}</span>
    </div>
  )
}

```
위 방법처럼 콜백없이 스토어 훅을 호출하면 개별 상태나 액션이 아닌 스토어 객체를 얻을 수 있지만, <br />
사용하지 않는 상태 등이 변경되어도 컴포넌트가 리렌더링 되기 때문에 위 방법은 권장하지 않는다.

#### 권장 O
```tsx
function Counter() {
  const count = useCountStore((state) => state.count);
  return (
    <div>
      <span>{count}</span>
    </div>
  );
}
```
위 방법은 useStore에서 제공하는 패턴방식중 하나이다.
useStore에 state에서 필요한 값만 추출하여 사용하기에 불필요한 리렌더링을 방지하고 필요한 값만 선택적으로 사용할 수 있습니다.
현재 위 방법을 권장하고 있습니다.

