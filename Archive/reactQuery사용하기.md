# React Query (TanStack Query) 를 공부해보자
평소 React Query가 있어 서버와의 통신과정에서 캐시 제어가 더 쉬워진다는 말은 많이 들었지만 딱히 필요가 없어 사용하고 있진 않았다.<br />
그런데 최근 업무에서 React Query로 마이그레이션 할 일도 생기고 해서 이참에 제대로 공부해보면 좋겠다 해서 공부 해보겠다.<br />
2023년 9월에 React Query는 TanStack Query로 이름이 변경하게되었다.<br />
자세한 정보는 공식문서에서 확인할 수 있으니 따로 풀진 않겠다.<br />
그래서 나도 TanStack Query로 부르도록 하겠다.<br />
## React Query란?
React Query는 서버로부터 데이터 가져오기, 데이터 캐싱, 캐시 제어 등 데이터를 쉽고 효율적으로 관리할 수 있는 라이브러리입니다.<br />

### TanStack Query 대표 기능
1. 데이터 가져오기 및 캐싱
2. 동일 요청의 중복 제거
3. 신선한 데이터 유지
4. 무한 스크롤, 페이지네이션 등의 성능 최적화
5. 네트워크 재연결, 요청 실패 등의 자동 갱신

## TanStack Query 설치하기
```bash
npm i @tanstack/react-query
```
## TanStack Query 초기세팅 하는 법
```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserView from "./components/UserView";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserView />
    </QueryClientProvider>
  );
}

export default App;
```
위 방법처럼 전역 컴포넌트에 new QueryClient()를 만들어 QueryClientProvider로 컴포넌트를 감싸야 한다.<br />
이렇게 해야 전역에서 상태 관리와 캐시를 관리하여 제공할 수 있기 때문이다.<br />

## 데이터 캐싱
```tsx
import { useQuery } from "@tanstack/react-query";

interface IResponseValue {
  message: string;
  time: string;
}

function UserView() {
  const { data } = useQuery<IResponseValue>({
    queryKey: ["delay"],
    queryFn: async () => {
      const response = await fetch("https://api.heropy.dev/v0/delay?t=1000");
      const data = await response.json();
      return data;
    },
  });
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default UserView;

```
다중 쿼리 키의 값을 사용해야 할 경우 아래처럼 movieTitle(영화 제목 검색어)를 사용하여 다른값을 넣어주면 별개의 요청을 각각 전송한다.<br />
```tsx
    queryKey: ["delay", movieTitle],
```
TanStack Query는 쿼리 키(query Key)를 필수로 사용하여 데이터를 가져올지<br />
이 쿼리 키는 캐시된 데이터와 비교하여 쿼리 키와 일치하는 캐시된 데이터가 없을 시 새로운 데이터를 서버를 통해 가져오고,<br />
쿼리 키와 일치하는 캐시된 데이터가 있으면 서버에 요청을 보내지 않고 해당 데이터를 사용한다.<br />
## queryFn 옵션
```tsx
import { useQuery } from "@tanstack/react-query";

interface IResponseValue {
  message: string;
  time: string;
}

function UserView() {
  const { data, error } = useQuery<IResponseValue>({
    queryKey: ["delay"],
    queryFn: async () => {
      const response = await fetch("https://api.heropy.dev/v0/delay?t=1000");
      const data = await response.json();
      if (!data.time) {
        throw new Error("문제가 발생했습니다!");
      }
      return data;
    },
  });
  return (
    <div>
      <div>{data?.message}</div>
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default UserView;
```
쿼리 함수(queryFn)는 데이터를 가져오는 비동기 함수로, 필수로 데이터를 반환하거나 오류를 던져야 한다고 한다.<br />
던져진 오류는 반환되는 error 객체로 확인할 수 있고 기본값은 null이다.<br />

## 데이터가 상했다고? ( isStale 상태관리 하기 )
```tsx
import { useQuery } from "@tanstack/react-query";

interface IResponseValue {
  message: string;
  time: string;
}

function UserView() {
  const { data, isStale } = useQuery<IResponseValue>({
    queryKey: ["delay"],
    queryFn: async () => {
      const response = await fetch("https://api.heropy.dev/v0/delay?t=1000");
      const data = await response.json();
      return data;
    },
    staleTime: 5000, // 5000ms = 5초
  });
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <div>{isStale ? "데이터가 상했습니다." : "데이터가 신선합니다"}</div>
    </div>
  );
}

export default UserView;

```
TanStack Query는 isStale를 사용하여 캐시한 데이터를 신선(Fresh)하거나 상한(Stale) 상태로 구분해 관리한다.<br />
이는 캐시만료 시간과 다름개념으로 유통기한 정도로 생각하여 이해할 수 있다.<br />
staleTime으로 신선도 상태 시간을 ms단위로 설정할 수 있다.<br />
신선도 상태 여부는 isStale로 확인할 수 있다.<br />
isStale의 타입은 boolen으로 신선하면 false, 상했으면 true로 확인할 수 있다.<br />
캐시된 데이터가 신선하다면 캐시된 데이터를 사용하고, 만약 데이터가 상했다면 서버에 다시 요청해 새로운 데이터를 가져옵니다.<br />

## 임시데이터 선정하기 ( placeholderData )
```tsx
      placeholderData: (prev) => prev,
```
새로운 데이터를 가져오는 과정에서 쿼리가 무효화되면 일시적으로 데이터가 없는 상태가 되는데 View에서 이는 화면깜빡임 문제를 발생시킬 수 있다.<br />
이러한 현상을 방지하기 위해서 placeholderData를 사용한다.<br />
placeholderData를 사용하면 호출 대기상태일때 임시로 표시할 데이터를 선정하여 표시할 수 있다.<br />

## 변경된 부분만 재사용하기 ( structuralSharing )
```tsx
structuralSharing: false,
```
structuralSharing을 사용하면 새로운 데이터를 사용할때 이전 대ㅔ이터와 비교하여 변경되지 않은 부부은 이전데이터를 사용하고<br />
변경된 부분은 새로운 데이터를 가져와 사용할 수 있다.<br />
이를 사용하면 메모리 사용량을 최적화할 수 있고 불필요한 리렌더링을 방지할 수 있다.<br />
위 설명만 보면 무조건 true로 설정하는 것이 좋을 것 같지만 그렇지만은 않다.<br />
예를 들어 큰 중첩객체를 다루는 경우 비교하려는 거 자체가 성능에 오히려 부담이 되어 악영향을 낄칠 수 있다.<br />
또 데이터가 항상 새로운 참조로 가져와야 하거나 데이터가 단순한 형태 처럼 비교가 구지 필요하지 않을 경우에 false로 설정하는 것을 권장하고 있다.<br />
structuralSharing의 기본값은 true로 설정되어있어 구지 true로 적을 필요가 없다.<br />

## 상태확인
```tsx
import { useQuery } from "@tanstack/react-query";

interface IResponseValue {
  message: string;
  time: string;
}

function UserView() {
  const { data, isFetching, isPending, isLoading, isStale, error } =
    useQuery<IResponseValue>({
      queryKey: ["delay"],
      queryFn: async () => {
        const response = await fetch("https://api.heropy.dev/v0/delay?t=1000");
        const data = await response.json();
        if (!data.title) {
          throw new Error("문제가 발생했습니다!");
        }
        return data;
      },
      placeholderData: (prev) => prev,
      structuralSharing: true,
      staleTime: 5000,
    });
  return (
    <div>
      <div>데이터가 {isStale ? "상했어요.." : "신선해요!"}</div>
      <div>{data?.time}</div>
      {error && <div>{error.message}</div>}
      <div>isFetching: {JSON.stringify(isFetching)}</div>
      <div>isPending: {JSON.stringify(isPending)}</div>
      <div>isLoading: {JSON.stringify(isLoading)}</div>
    </div>
  );
}

export default UserView;
```
## 반환 데이터
1. isFetching
   - queryFn이 실행중인지 여부
   -  타입: boolean
3. isPending
   - 캐시된 데이터가 없고 쿼리가 아직 완료되지 않은 상태의 여부
   - 타입: boolean
5. isLoading
   - isFetching && isPending이거랑 같음
   - 퀄의 첫번째 가져오기가 진행중인 경우
   - 타입: boolean

```jsx
// 상태 가져오기
  const {data, isFetching, isPending, isLoading,} = useQuery<IResponseValue>({
// 사용하기
      <div>isFetching: {isFetching ? "true" : "false"}</div>
      <div>isPending: {isPending ? "true" : "false"}</div>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
```
위 방법처럼 사용할 수 있다.<br />

## 데이터 가져오기 ( refetch )
```tsx
  const { refetch } = useQuery<IResponseValue>({
  // 사용하기
      <button onClick={() => refetch()}>데이터 무조건 불러오기</button>
```
위 방법처럼 신선도에 관계없이 데이터를 불러오고 싶을 때 refetch함수를 사용하여 데이터를 불러올 수 있다.<br />
캐시의 상태와 무관하다.

## 신선도 캐시상태에 따라 데이터 불러오기 ( fetchQuery )
```tsx
  const queryClient = useQueryClient();

  async function fetchData() {
    await queryClient.fetchQuery<IResponseValue>({
      queryKey: ["delay"],
      staleTime: 10000,
    });
  }

      <button onClick={() => fetchData()}>데이터 신선도에 따라 불러오기</button>
```
위 방법처럼 useQueryClient()를 사용하여 fetchQuery의 옵션을 맞춰주면, <br />
쿼리키에 해당하는 신선도에 따라 데이터를 가져올지 말지 여부에 따라 가져올 수 있다.<br />
이때 queryFn은 생략이 가능하며 queryKey와 staleTime만 동일하게 맞춰주면 된다.<br />
<br />
<br />
참고 블로그: https://www.heropy.dev/p/HZaKIE

