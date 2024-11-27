# react-host-toast 사용하기
먼저 react-host-toast 를 배우기 전에 Toast를 모르는 사람들을 위해 토스트가 뭔지, 왜 쓰는 지, 그리고 react-host-toast를 선택한 이유를 먼저 선택하겠다. 
## Toast Message란?
사용자에게 간단한 정보를 잠깐 보여주는 UI 요소이다.
말 그대로 잠깐동안만 보여줄 것이기에 불필요하게 번잡한 모달이나 확인버튼을 눌러야 되고 커스텀도 안되는 alert 이런거 안쓰고 Toast 쓰면 된다.<br/>
<br/>
***ex: 예시*** <br />
***![image](https://github.com/user-attachments/assets/58baefaf-9672-43e1-a8f8-7b61d8acba0f)***<br/>
<br/>
대충 유저가 어떤 액션을 취하면 그에 대한 간단한 정보를 위 사진 처럼 보여주는 게 토스트메세지 이다.<br/>

리액트에서 Toast의 대표적인 라이브러리로 `react-hot-toast`, `react-toastify` 가 있는데 이 중 react-hot-toasts에 대해 알아보겠다.

## react-hot-toast VS react-toastify

react-hot-toast를 선택한 이유는 toastify보다 패키지크기가 적고 보일러 플레이트 코드가 적고 디자인을 직접 안해도 된다는게 장점이다.
react-toastify는 디자인인 되어있지 않아 커스텀 디자인을 직접 만들어줘야 하고 성공했을 떄 실패 했을 떄 디자인을 하나하나 만들어야 되기 때문이다.
하지만 이러한 커스텀으로 hot-toast보다 높은 자유로도 time bar, bundle로 높은 자유도를 가지고 있지만 솔직히 hot-toast의 디자인도 이쁘다.
필요한 부분에 별도의 디자인이나 긴 코드 없이 한줄로 간단하게 넣을 수 있다는게 장점이다.

#### 3줄 요약
react-hot-toast 👑!
1. 패키지 크기 ⬇️
2. 보일러플레이트 코드 ⬇️
3. 불필요한 디자인코드 ❌

## react-host-toast 사용하기

먼저 패키지를 다운해야 한다.
다운로드 방법은 아래와 같다.
```

npm install react-hot-toast

```
```

yarn add react-hot-toast

```

이후 import로 불러온다
```jsx
import toast, { Toaster } from "react-hot-toast";
```
사용하고 싶은 곳에 import 했던 `<Toaster />` 컴포넌트를 추가하면 보일러플레이트는 끝이다.
```jsx
toast('메시지')
```
이런식으로 필요한 곳에 사용하여 쓸 수 있다
또 react-hot-toast는 각 상황에 맞는 toast를 적용할 수 있다.
이를 적용하면 상황에 맞는 gif 이모지가 자동으로 나온다
## 종류
1. success ( 성공 )
 ```jsx
   toast.success('성공 메세지')
```
2. error ( 오류 )
```jsx
toast.error(`에러 메세지)
```
3. promise ( 프로미스 상태 )
```jsx
toast.promise(
  적용시킬 함수(),
   {
     loading: '로딩 메세지',
     success: <b>성공 메세지</b>,
     error: <b>에러 메세지</b>,
   }
 );
```

이 외에도 다른 이모지를 사용하고 싶다면 커스텀으로 직접 넣을 수 있다
## 커스텀

1. 이모지 커스텀
```jsx
toast('Good Job!', {
  icon: '👏',
});
```

2. 색깔 커스텀 ( 다크 모드 )
```jsx
toast('Hello Darkness!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
```

3. 포지션 커스텀<br /> ( top-left, top-center, top-right, bottom-left, bottom-center, bottom-right )
    position = toast 생성 위치를 커스텀할 수 있다. 
   reverseOrder = toast 정렬을 커스텀 할 수 있다. ( true = 위로 하나하나 쌍이게 됨, flase = 밑으로 들어가서 하나씩 추가되는 느낌 )
```jsx
<Toaster
  position="top-left"
  reverseOrder={true}
/>
```

4. Themed 커스텀
```jsx
toast.success('Look at my styles.', {
  style: {
    border: '1px solid #713200',
    padding: '16px',
    color: '#713200',
  },
  iconTheme: {
    primary: '#713200',
    secondary: '#FFFAEE',
  },
});
```
<br />
더 자세한 정보는 공식 사이트에서 확인해보도록 하자<br />
[react-hot-toast 공식 사이트](https://react-hot-toast.com/)
<br />

## 느낀점
원래 alert과 모달만 쓰다가 이런 것들을 알게 되어 많이 사용할 것 같고 사용법도 쉽고 기능에 따라 다양하게 사용할 수 있어서
유용할 것 같다.
