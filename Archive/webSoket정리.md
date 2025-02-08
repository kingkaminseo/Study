# Web Socket 사용해보기 🎯 ( 실전 편 )

### 소캣 설치
```
npm i socket.io
```

## 소캣 연결하는 법
### .connect()
### 
```ts
const socket = io('https://backendServerUrl').connect()
```
```ts
const socket = io('http://backendServerUrl', { 
    path: '/socket.io', 
    transports: ['websocket']
});
```
io함수의 아규먼트로 백엔드와 통신을 주고받을 서버의 주소를 입력
1. `path`: 서버의 path와 일치시켜줌 ( http://backendServerUrl/path ) <- 방식 사용 x
    - 소캣서버는 `기본 path`가 있기 때문에 위와 같은 방식으로 넣으면 문제를 야기시킬 수 있기 때문에 권장하지 않음
2. `transports`: `socket.io`는 처음에 `polling` 연결을 시도하고, 웹소켓이 지원되는 브라우저인 경우, `ws통신`으로 이행함
   - 처음부터 ws로 통신하고자 할 경우, transports 옵션 값을`['websocket']`으로 설정해주면 된다. 
## 데이터 송수신 하는 법

### .emit()
```tsx
    socket.emit('event Name', {
      chatData: e.currentTarget.id,
    })
``` 
내장 메소드 `emit()`은 연결된 socket서버로 클라이언트에 단에 있는 데이터를 전송하는 명령어이다. <br/>
첫번째 아규먼트로는 백엔드에서 정의한 event Name이 들어가고, 두번째는 넘겨줄 데이터를 넣어주면 된다.<br/>
event Name은 따로 정해진 것이 없고 백엔드에서 소캣을 설정할때 Name과 맞춰주면 된다.

### .on()
```tsx
    socket.on('room logs', function (data) {
      setRoomLog(data)
    })
```

내장 메소드 on()은 연결된 소켓 서버에서 클라이언트로 전송할 데이터가 있는경우 해당한다.<br/>
위 예제 코드는 서버로 부터 채팅기록을 받아 상태변수에 저장하는 예시 이다.<br/>
두번째 인자로 함수를 사용해 파라미터를 받고 데이터를 사용할 수 있다.

## 소켓 연결 해제하는 법
### .disconnect()
```ts
 if (socket) {
    socket.disconnect();
}
```

위와 같은 방법으로 disconnect()를 사용하여 연결된 소켓을 해제할 수 있다.
- 이를 사용하면 on() 이나 emit() 도 안됌
위 코드는 주로 해당 컴포넌트가 언마운트 되었을 때 사용되며 리소스 중복 등의 문제로 인한 성능 저하 문제등을 해결할 수 있다.
