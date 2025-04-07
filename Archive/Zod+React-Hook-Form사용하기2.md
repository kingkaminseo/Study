# Zod + React-Hook-Form 사용하기 1차 (React-Hook-Form 편)
저번시간에 Zod 라이브러리를 활용하여 여러가지 커스텀 스키마를 만들어보고 활용하는 법에 대해 배워보았다.  
이번 시간에는 React-Hook-Form에 대하여 공부해보고 Zod를 사용하여 만든 스키마로 React-Hook-Form을 사용하여 보겠다.  

## React-Hook-Form📋 이란?
> Performant, flexible and extensible forms with easy-to-use validation.  
> 유효성 검사를 쉽게 할 수 있는, 성능이 우수하고 유연하며 확장 가능한 form을 제공하는 라이브러리이다.  

 React-Hook-Form은 성능이 우수하고 유연한 사용자 정의 훅을 제공하는 React 폼 라이브러리이다. 
React-Hook-Form을 사용하면 복잡한 폼 유효성 검사 로직을 쉽게 작성하고, 컴포넌트 상태를 간단하게 관리할 수 있다.

### React-Hook-Form이 필요한 이유
가장 큰 이유는 간단함과 편리함이다.
당장 회원가입만 예시로 들어봐도 기본 4개 이상되는 입력 폼의 상태와 각 폼을 관리할 수 있는 상태  그리고 이것들을 관리해주는 별도의 커스텀 훅이나
validation 들 그리고 이에대한 예외처리 로직을 생각해보면 생각보다 많은 상태관리와 많은 훅들이 필요하다.  
이것들만 생각하더라도 벌써 복잡하고 머리가 아프다.  
이 문제를 간단하게 해결할 수 있는게  React-Hook-Form이다.  

### React-Hook-Form의 장점
1. 간단함
2. 다른 훅폼 라이브러리와 비교하였을 때 속도가 가장 빠름
## React-Hook-Form 사용하기
### React-Hook-Form 설치하기
```bash
npm install react-hook-form
```
### useForm 훅 만들기
```jsx
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      age: undefined,
      password: "",
      confirmPassword: "",
    },
  });
```

### 사용하려는 스키마
```js
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
### 상태관리 하기
```tsx
  <div>
      <div className="m-auto">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요."
          {...register("name")}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="비밀번호를 한번더 입력해주세요."
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <label htmlFor="age">나이</label>
        <input
          type=""
          id="age"
          placeholder="나이를 입력해주세요."
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
      </div>
      <p>실시간 이름: {nameValue}</p>
      <button onClick={handleSubmit((e) => console.log(e))}>제출</button>
      <button onClick={() => reset()}>리셋</button>
    </div>
```
