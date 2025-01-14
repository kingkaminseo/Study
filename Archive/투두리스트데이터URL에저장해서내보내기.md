# 투두리스트 데이터 URL에 저장해서 공유 기능 만들기

URL 쿼리파라미터에 데이터 넣는 법을 공부하다 투두리스트에 적용시키면 좋겠다 라고 생각하여 이를 구현해보았다.
먼저 React로 쿼리스트링에 데이터를 넣는법에 대해 알아보자.

쿼리파라미터에 데이터를 넣기위해서 `react-router-dom` 라이브러리에 `useSearchParams` 훅을 사용하였다.

### `useSearchParms` 사용법
```tsx
import { useSearchParams } from "react-router-dom";

//사용하기
const [searchParams, setSearchParams] = useSearchParams();

// 현재 url에 쿼리파라미터 업데이트
setSearchParams({key: vlaue, name: 'minseo'})
// https://minseo.com/?key=value&name=minseo  (쿼리스트링)

// key값이 name인 데이터 조회
searchParams.get('name')

// key에 name값의 유무를 확인
searchParams.has('name')
```
## 사이드프로젝트 설명
투두리스트에서 `toDoListData`를 문자열로 변경 후 인코딩과 `base64`인코딩 한 후 다른 컴포넌트에서 열도록 하여
링크로 접속한 유저들은 생성 수정 삭제가 불가능하도록 하였고 해당 컴포넌트에서 이를 디코딩하여 조회만 가능하도록 구현해보았다.

## 공유 URL 내보내기 코드

```tsx
      <button
        onClick={() => {
          const data = btoa(encodeURIComponent(JSON.stringify(toDoListData)));
          setUrlData(data);
        }}
      >
        내보내기
      </button>

// 쿼리파라미터로  data 키에 저장해두었던 urlData를 사용하여 url 만들기
      {urlData && (
        <a href={`http://localhost:5173/filteruser?data=${urlData}`}>
          http://localhost:5173/filteruser?data={urlData}
        </a>
      )}
```
### 코드 설명 ( 공유 URL 내보내기 코드 )
`toDoListData`를 `JSON.stringify` 함수를 사용하여 문자열로 변경하고 한국어와 같은 문자나 띄어쓰기 등의 특수문자 등을 `base64`로 인코딩 하면 오류가 나기 때문에
이러한 특수문자들을 먼저 `encodeURIComponent`함수로 인코딩해준 후 `base64`로 다시 인코딩하여 쿼리파라미터에 `key`가 `data`인 `vlaue`에 넣은 후 유저에게 `url`을 렌더링 시켜주었다.

## 유저 조회 코드
```tsx
  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      setJson(JSON.parse(decodeURIComponent(atob(data))));
      console.log(JSON.parse(decodeURIComponent(atob(data))));
    } else {
      setJson(["data가 없습니다."]);
    }
  }, []);
```

### 코드 설명 ( 유저 조회 코드 )
먼저 파라미터중 키가 data인 파라미터를 조회하여 data에 저장하고 이때 data가 있으면 객체로 디코딩 후 setJson에 저장시키고
만약 data가 없다면 `'data가 없습니다.'` 문구를 담았다
