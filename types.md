## Type Script 타입 지정하는 법

변수 선언시에 타입을 지정하고 싶으면 변수뒤에 :를 추가하여 타입을 지정하면 된다.
```
const variable: <type> =  'Hello World~!'
```
#### Array 타입

배열 타입은 두 가지 방법으로 쓸 수 있다.
```
let fruits: string[] = ['Apple', 'Banana', 'Mango'];
```
또는
```
let fruits: Array<string> = ['Apple', 'Banana', 'Mango'];
```
이다
