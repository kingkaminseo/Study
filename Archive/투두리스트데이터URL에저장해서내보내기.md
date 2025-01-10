# 투두리스트 데이터 URL에 저장해서 공유 기능 만들기

URL 쿼리파라미터에 데이터 넣는 법을 공부하다 투두리스트에 적용시키면 좋겠다 라고 생각하여 이를 구현해보았다.
먼저 React로 쿼리스트링에 데이터를 넣는법에 대해 알아보자.

쿼리파라미터에 데이터를 넣기위해서 `react-router-dom` 라이브러리에 `useSearchParams` 훅을 사용하였다.

Import 하기
```tsx
import { useSearchParams } from "react-router-dom";

//사용하기
const [searchParams, setSearchParams] = useSearchParams();

// 현재 url에 쿼리파라미터 업데이트
setSearchParams({key: vlaue, name: 'minseo'})
// https://minseo.com/?key=value&name=minseo  (쿼리스트링)

// key값이 name인 데이터 조회
params.get('name')

// key에 name값의 유무를 확인
params.has('name')
```
투두리스트에서 유저가 만든 Array를 객체로 변경후 인코딩과 base64인코딩 한 후 다른 컴포넌트에서 열도록 하여
링크로 접속한 유저들은 생성 수정 삭제가 불가능하도록 하였고 해당 컴포넌트에서 이를 디코딩하여 조회만 가능하도록 구현해보았다.
```tsx
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Filter() {
  const [json, setJson] = useState<string[]>([]);
  const [indexList, setIndexList] = useState<number[]>([]);
  const [text, setText] = useState("");
  const [urlData, setUrlData] = useState("");

  return (
    <>
      <input
        type="text"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            setJson([...json, e.currentTarget.value]);
            setText("");
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
        value={text}
      />
      <div>
        <ol>
          {json.map((data, index) => (
            <li>
              {indexList.includes(index) ? (
                <input
                  defaultValue={data}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const before = json.filter((_, i) => i < index);
                      const after = json.filter((_, i) => i > index);
                      const arr = [...before, e.currentTarget.value, ...after];
                      setJson(arr);
                      setIndexList(indexList.filter((n) => n != index));
                    }
                  }}
                />
              ) : (
                data
              )}
              <button
                onClick={() => {
                  setJson(json.filter((d, i) => i != index));
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  if (indexList.includes(index)) {
                    setIndexList(indexList.filter((n) => n != index));
                  } else {
                    setIndexList([...indexList, index]);
                  }
                }}
              >
                {indexList.includes(index) ? "Close" : "Change"}
              </button>
            </li>
          ))}
        </ol>

        <button
          onClick={() => {
            localStorage.setItem("array", json.join(","));
          }}
        >
          저장
        </button>
        <button
          onClick={() => {
            const array = localStorage.getItem("array");
            if (array) {
              toast.success(<b>성공적으로 불러옴</b>);
              setJson(array.split(","));
            } else {
              toast.error(<b>못 불러옴</b>);
            }
          }}
        >
          불러오기
        </button>
        <button
          onClick={() => {
            const data = btoa(encodeURIComponent(JSON.stringify(json)));
            // setSearchParams({ data: data });
            setUrlData(data);
          }}
        >
          내보내기
          {urlData && (
            <a href={`http://localhost:5173/filteruser?data=${urlData}`}>
              http://localhost:5173/filteruser?data={urlData}
            </a>
          )}
        </button>
      </div>
      <Toaster />
    </>
  );
}

export default Filter;
```
조회 tsx
```
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterUser() {
  const [json, setJson] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      setJson(JSON.parse(decodeURIComponent(atob(data))));
      console.log(JSON.parse(decodeURIComponent(atob(data))));
    } else {
      setJson(["data가 없습니다."]);
    }
  }, []);

  return (
    <>
      <ol>
        {json.map((a) => (
          <li>{a}</li>
        ))}
      </ol>
    </>
  );
}

export default FilterUser;

```
