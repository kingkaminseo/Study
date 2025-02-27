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
~~리덕스에 대해서는 자세히 풀지 않겠습니다. 다른데가서 공부하쇼~~

## Zustand 사용하기

### 설치하기
```bash
npm install zustand
```

### Store 만들기
```tsx         
import { create } from 'zustand'

type Store = {
  count: number
  inc: () => void
}

const useStore = create<Store>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))
```

### 컴포넌트에 바인딩하여 사용하기
```tsx
function Counter() {
  const { count, inc } = useStore()
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  )
}

```
