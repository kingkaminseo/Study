# React의 Lazy Loading과 Suspense로 성능 최적화하기

리액트는 다양한 방법으로 성능 최적화 할 수 있다.
오늘은 Lazy-loading, Code-splitting, Suspense를 사용하여 성능을 최적화 시키는 법을 알아보자

## Lazy-loading 이란? ( 지연 로딩 )
#### Lazy loading이란?
React.lazy는 처음 렌더링될 때 모든 컴포넌트를 한 번에 로드하지 않고,<br/> 유저가 필요로 하는 시점에 맞춰 동적으로 컴포넌트를 로드하여 화면에 보여주는 기능이다.
애플리케이션의 초기 로딩 속도를 최적화하고, 사용자가 필요할 때만 리소스를 로드할 수 있게 되어 성능을 향상시킬 수 있다.<br/>
#### 예시
유저가 페이지를 방문했을 때, 화면에 보이지 않는 이미지나 컴포넌트는 나중에 로드되서 유저에게 보여준다.<br/>
만약 유저가 페이지를 방문하였을 때, 모든 이미지나 컴포넌트를 로드한다면 이미지나 컴포넌트가 하나 두개라면 크게 상관없지만,<br/>
만약 쇼핑몰이나 이미지 수가 많이 필요한 곳, 컴포넌트 수가 많다면 이를 한꺼번에 다 로드하기 때문에 초기로딩 속도가 지연될 수 있다.<br/>
내 경험을 설명해보면 사진을 저장할 수 있는 프로젝트를 진행하면서 배포 하였다. 이때 이미지 수가 많아지면 초기 로딩속도가 20초가 넘게 까지 지연되는 문제가 발생하였다.
이는 웹성능과 UX적으로 큰 문제이다. 이를 loading lazy로 해결하여 로딩 시간을 크게 단축하였다.

## Lazy-loading 사용하기

```jsx
import React from 'react';
// Lazy 함수를 불러오기 위한 React 라이브러리 불러오기

const LazyComponent = React.lazy(() => import('./LazyComponent'));
// Lazy로 컴포넌트를 불러옴
```
```jsx
function App() {
  return (
    <>
      <h1>Lazy Loading Example</h1>
        <LazyComponent />
    </>
  );
}

export default App;
```

## Suspense 이란?
