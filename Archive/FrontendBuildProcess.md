## 빌드 순서 및 과정 정리 (Frontend Build Process)

FrontEnd 빌드 순서 및 과정은 다음과 같이 정리할 수 있다.

### 1. Transpiling
최신 `JS`, `JSX`, `TypeScript` 등 브라우저가 직접 이해하지 못하는 코드를 브라우저가 이해할 수 있는 일반 JS 코드로 변환하는 과정이다.  
이때 Babel 등과 같은 트랜스파일러 도구를 사용한다.

### 2. Bundling
여러 개의 파일(특히 JavaScript, CSS, 이미지 등 웹 개발에 필요한 리소스 파일들)을 하나 또는 몇 개의 파일로 묶는 작업이다.

#### 왜 번들링을 할까?
- HTTP 요청 수 감소로 속도 향상된다. 번들링을 거치지 않고 여러파일을 개별적으로 요청하면 속도가 오래걸림

도구로는 대표적으로 Webpack, Rollup 등이 있다.


### 3. Optimization
생성된 코드와 리소스를 성능과 용량 측면서에서 최적화 하는 단계이다.
불필요한 코드나 파일 크기를 감소하여 로딩 속도 등을 향상 시킨다.
1. Tree Shaking
   사용하지 않은 코드를 제거한다.
2. Minify
   불필요한 공백이나 주석 등을 제거하고 파일 크기를 최소화 한다
3. Lazy Loading 처리
   이때 Lazy Loading을 처리한다
4. 환경변수 적용
도구로는 Webpack이나 Rollup등의 지원하여 처리한다.

### 정적 파일 생성
build 폴더에 정적 파일들을 배포가능한 형태로 생성한다.


정리: Transpiling -> Bundling -> Optimization -> 정적 파일 생성
