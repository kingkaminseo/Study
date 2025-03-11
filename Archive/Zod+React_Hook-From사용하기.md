# Zod + React-Hook-Form 사용하기 1차 (Zod 편)

인기 있는 유효성 검사 라이브러리인 Zod와 React-Hook-Form를 공부해보았다.
회사 서비스를 리팩토링할 일이 생겨 기술스택을 정의하고 있었는데 직원분들이 Zod와 React-Hook-Form을 추천해주셨다.
이를 최신서비스에 대입하기 전에 왜 이걸 사용해야 하는 지, 장점과 사용방법 등에 대해 알아보자.
먼저 Zod를 알아보겠다.

## Zod💎 란?
```
zod is a TypeScript-first schema declaration and validation library. -Zod Docs
```
Zod는 공식문서에 따르면 스키마 스키마 선언 및 유효성 검사 라이브러리 이다.
Zod는 Typescript를 기반으로 하지만, Typescript와 JavaScript 개발환경에서 모두 사용할 수 있다.
### Zod가 필요한 이유
Typescript의 한계 때문이다.
Typescript는 컴파일 할때 타입에러만 잡아낼 수 있고 런타임 단계에서는 JavaScript로 동작하기 때문에 타입에러를 잡지 못한다.
그리고 Typescript에서 number 타입만 강제하는 것은 가능하나 그 범위를 강제하거나 정수/실수 구분은 불가능하다.
이러한 TypeScript의 한계 때문에 Zod라이브러리를 사용하는 것 이다.

### Zod 장점
1. Zero Dependencies
   - 의존성이 없다.
2. Works in Node.js and all modern browsers
   - Node.js 및 모든 최신 브라우저에서 작동
4. Tiny: 8kb minified + zipped
   - 8kb로 매우 가벼움
6. Immutable: methods (e.g. .optional()) return a new instance
   - 메소드들 새로운 인스턴스 반환
7. Concise, chainable interface
   - 간결하고 연결가능한 인터페이스
8. Works with plain JavaScript too! You don't need to use TypeScript
   - TypeScript처럼 JavaScript환경에서도 가능함

그리고 다른 라이브러리들에 비해 성능이 우수하다.
React 유효성 검사 라이브러리 중 Formik, Redux Form이 있는데 이들보다 속도가 훨씬 빠르다
React Hook Form: 3800ms < Formik: 5800ms < Redux Form: 16000ms

이제 Zod의 필요성과 장점에 대해 알아보았으니 이를 사용해보겠다.

## Zod 설치하기
```bash
npm install zod
```
## 간단한 스키마 만들기
```tsx
import { z } from 'zod';

const mySchema = z.string();
```
## parse, safeParse 사용하여 검증하기
### Parse
```tsx
console.log(mySchema.parse('hello')); // hello
console.log(mySchema.parse(123)); // throw Error
```
parse를 사용하여 스키마의 타입과 일치하는 지 검사할 수 있다
성공시 데이터를 반환하고 실패시 throw Error를 던진다

### safeParse
```tsx
console.log(mySchema.safeParse('hello')); // {success: true, data: hello}
console.log(mySchema.safeParse(123)); // {success: false}
```
safeParse를 사용하면 throw Error를 하지않고 객체로 성공의 여부를 반환한다.
## 복잡한 형태의 스키마 생성하기
```tsx
const schema = z
  .object({
    name: z.string().min(1, { message: "이름은 필수값 입니다." }),
    age: z
      .number({ invalid_type_error: "나이는 필수 값입니다." })
      .min(1, { message: "나이는 1살부터 입력이 가능합니다." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
```
위 처럼 Form데이터를 스키마로 정의해보았다.
1. Key: name
   - 타입: string
   - 제한: 최소 1자 이상
   - error: { message: "이름은 필수값 입니다." }
2. Key: 나이
   - 타입: number
   - 제한: 최소 1자 이상
   - error: (number 타입이 아닐 때) = { invalid_type_error: "나이는 필수 값입니다." }
   - error: { message: "나이는 1살부터 입력이 가능합니다." }
3. Key: passowrd
   - 타입: string
   - 제한: 최소 6자 이상
   - error: { message: "비밀번호는 최소 6자 이상이어야 합니다" }
4. Key: confirmPassword
   - 타입: string
   - 제한: X
   - 검증: data.password === data.confirmPassword
   - error: message: "비밀번호가 일치하지 않습니다."
## 스키마의 타입
```tsx
type FormData = z.infer<typeof schema>;
```
위와 같이 타입을 정의할 수 있다.

지금까지 Zod에 대해 간단하게 알아보았다.
Zod를 왜 사용해야 하는 지, Zod의 장점과 Zod를 사용하여 스키마를 생성하고 검증까지 하는 법을 알아보았다.
그 다음으로 앞서말했듯이 React-Hook-Form라이브러리를 함께 사용하여 유효성 검증 로직을 구현해보겠다.

