# formData 로 이미지 저장해서 API Req보내기

formData를 사용하여 이미지를 저장하여 api에 요청을 보내고 이미지 미리보기 기능 등을 구현하였다.

## 배운개념

1. ```jsx
   e.target.files?.[0]
   ```
4. ```jsx
   URL.createObjectURL();
   ```
5. ```jsx
   let formData = new FormData();
   ```
6. ```jsx
   formData.append("file", file);
   ```
7. ```jsx
   && ( 조건부 렌더링 )
   ```

# 설명

## e.target.files?.[0]
### input type이 file로 되어있는 거 저장시키는 법 
이벤트가 발생한 `e.target`에서 `files`를 사용하여 값을 불러와 파일을 저장해야한다.
[0]로 배열로 불러온 이유는 `files`가 배열로 이루어져 있기 때문에 `[0]` 이렇게 접근해야 한다.
멀티플이 아니고 값이 하나여도 `[0]` 이런식으로 접근하여 가져오도록 하자

## URL.createObjectURL();
저장한 파일을 URL로 만들어준다.
그럼 `src={ }` 에 넣어 이미지를 불러올 수 있고 이미지를 띄울 수 있다.
이를 활용하여 미리보기 기능을 만들 수 있다.

## new FormData();
폼데이터 만드는 방법
진짜 별거 없다.
`new FormData()` 해서 변수에 저장하면 끝이다.

## formData.append("Name", Key);
폼 데이터 저장시키는 방법이다.
`Name`과, `Key` 값으로 이루어져 있다.

## 조건부 렌더링 ( && )
`AND` 연산자를 조건부 렌더링으로 활용할 수 있다
`AND` 연산자란 `?` `&&` 연산자는 두 피연산자가 모두 `true`일 때만 `true`를 반환한다.
이를 조건부 렌더링에 사용하면, 특정 조건이 참일 때만 후속 부분을 렌더링하도록 만들 수 있습니다.
ex
``` jsx
{value && <p>Hello world~!</p>}
```
이걸 참고하면 value가 true이면 p태그를 렌더링 하고 false라면 렌더링 하지 않습니다.


## 간단하게 만들어본 예제 코드
### EX: 
```tsx
import React, { useState } from "react";

function Asf() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  function getimagefile(event: any) {
    let image = event.target.files[0];
    if (image) {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  }

  async function go() {
    if (!file) {
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`api-url`, {
        method: "POST",
        body: formData,
      });

      let result = await response.json;
      if (response.ok) {
        alert("확인");
        console.log(result);
      } else {
        alert("실패");
      }
    } catch (error) {
      console.log("asf");
    }
  }

  return (
    <div className="App">
      <input type="file" onChange={getimagefile} />
      {preview && <img src={preview} alt="1" style={{ width: "300px" }} />}
      <button onClick={go}>이미지 제출</button>
    </div>
  );
}

export default Asf;
```
