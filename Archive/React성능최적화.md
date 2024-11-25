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
lazy함수를 사용하기 위해 필요한 라이브러리인 `React`를 불러오고 이후 `React.lazy()`를 사용하여 필요한 컴포넌트를 불러오면 된다.
ex
```jsx
import React from 'react';
// Lazy 함수를 불러오기 위한 React 라이브러리 불러오기

const LazyComponent = React.lazy(() => import('./LazyComponent'));
// Lazy로 컴포넌트를 불러옴
```
이후에는 평범한 컴포넌트 처럼 사용할 수 있다.
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
React.lazy를 사용하면 <LazyComponent /> 컴포넌트를 지연 로딩할 수 있어 초기 로딩 속도를 개선할 수 있다..<br/>
또한, Lazy Loading과 함께 컴포넌트가 로딩되는 동안 대체 UI를 보여주는 Suspense API를 함께 사용할 수 있다.
## Suspense 배우기
Suspense 컴포넌트를 사용하면 자식요소가 로드되기 전까지 화면에 대체 UI를 보여준다.
```jsx
<Suspense fallback={<Loading />}> 
  <ChildrenComponent />
</Suspense>
```
1. children
여기서 chilren 즉 Suspense의 하위컴포넌트는 렌더링하려는 실제 UI이다.
2. fallback
Suspense의 하위컴포넌트인 ChildrenComponent 컴포넌트가 렌더링이 지연되면 로드하는 동안 fallback에 있는 <Loading />컴포넌트를 보여주어 대체 UI로 렌더링 하여 보여준다.

suspense는 children의 렌더링이 지연되면 자동으로 fallback으로 전환하고, 데이터가 준비되면 children으로 다시 전환합니다.
만약 fallback이 렌더링이 지연되면 가장 가까운 부모 Suspense가 활성화 된다고 한다.

### 동시로딩 구현
SUspense의 하위컴포넌트로 a와 b가 있다면 둘 중 하나의 컴포넌트가 먼저 로드되더라도 지연시켜 모든컴포넌트들이 한꺼번에 보여지게 한다.
```jsx
<Suspense fallback={<Loading />}> 
  <a />
  <b />
</Suspense>
```

### 중첩된 콘텐츠 로드될 때 보여주기 구현
```jsx
<Suspense fallback={<BigSpinner />}>
  <Biography />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums />
    </Panel>
  </Suspense>
</Suspense>
```
이런식으로 사용한다면 <Biography />를 보여줄 떄 <Albums /> 컴포넌트가 로드될 떄까지 기다릴 필요가 없다.

#### 순서
1. Biography가 아직 로드되지 않은 경우, 전체 콘텐츠 영역 대신 BigSpinner가 표시됩니다.
2. Biography의 로딩이 완료되면 BigSpinner가 콘텐츠로 대체됩니다.
3. Albums가 아직 로드되지 않으면 Albums와 그 상위 Panel 대신 AlbumsGlimmer가 표시됩니다.
4. 마지막으로 Albums가 로딩을 완료하면 AlbumsGlimmer를 대체합니다.

Albums 컴포넌트를 가져오기 위한 Suspense의 falllback인 AlbumsGlimmer컴포넌트가 로딩 지연된다면 다 로드될 때까지 상위 suspense를 보여주게 된다.
