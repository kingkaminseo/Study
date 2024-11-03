## Type Script 타입 지정하는 법

변수 선언시에 타입을 지정하고 싶으면 변수뒤에 :를 추가하여 타입을 지정하면 된다.
```
const variable: <type> =  'Hello World~!'
```
#### 타입 - Array
배열 타입은 두 가지 방법으로 쓸 수 있다.
```
let fruits: string[] = ['Apple', 'Banana', 'Mango'];
```
```
let fruits: Array<string> = ['Apple', 'Banana', 'Mango'];
```
이다

#### 타입 - Tuple
튜플이란 간단하게 크기와 타입이 고정된 배열이다
예시
```
let rgbColor: [number, number, number] = [255, 255, 0];
```
2차원 튜플
```
let users: [number, string, boolean][];
users = [[1, 'Neo', true], [2, 'Evan', false], [3, 'Lewis', true]];
```

#### 타입 - Enum
Enum이란 Enum은 특정 값을 고정하는 또다른 독립된 자료형이다

```
// 상수 집합
enum Avengers { SpiderMan, IronMan, Thor, Hulk }

let hero: Avengers = Avengers.SpiderMan;
let hero: Avengers = Avengers[0];
```

#### 타입 - Void
일반적으로 함수에서 반환값이 없을 경우 사용
```
function warnUser(): void {
	console.log("This is my warning message");
}
```


#### 타입 - Any
any 타입은 단어 의미 그대로 모든 타입에 대해서 허용한다는 의미이다.
권장하진 않는 타입


#### 타입 - Unknown
Unknown은 알 수 없는 타입을 의미하며, any와 같이 모든 데이터 타입을 받을 수 있다.

#### 타입 - Null / Undefined
기본적으로 null 과 undefined는 다른 모든 타입의 하위 타입으로 치부된다.
null과 undefined를 아무 여러 타입에 할당할 수 있다


#### 타입 - Interface
인터페이스는 상호 간에 정의한 약속 혹은 규칙을 의미한다.
좀더 쉽게 말하자면 타입을 정의한 것들을 한데 모은 객체 타입이라고 말할 수 있다. 그래서 객체의 껍데기 혹은 설계도라고 불린다.

1. 객체의 스펙(속성과 속성의 타입)
2. 함수의 파라미터
3. 함수의 스펙(파라미터, 반환 타입 등)
4. 배열과 객체를 접근하는 방식
5. 클래스
```
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person { // 인터페이스 상속
  skill: string;
}

function logUser(obj: Developer) {
  console.log(obj.name);
  console.log(obj.age);
  console.log(obj.skill);
}

let person = { 
  name: 'Capt', 
  age: 28, 
  skill: 'typescript, javascript' 
};

logUser(person);
```

#### 함수(function) 타입 정의하기
```
function sum(a: 인자타입, b: 인자타입): 반환값타입 {
	return a + b;
}
```

공부 출처
출처: https://inpa.tistory.com/entry/TS-📘-타입스크립트-타입-선언-종류-💯-총정리 [Inpa Dev 👨‍💻:티스토리]
