# Web Socket 정리 

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
`emit()`은 연결된 socket서버로 클라이언트에 단에 있는 데이터를 전송하는 명령어이다. <br/>
첫번째 아규먼트로는 백엔드에서 정의한 event Name이 들어가고, 두번째는 넘겨줄 데이터를 넣어주면 된다.<br/>
event Name은 따로 정해진 것이 없고 백엔드에서 소캣을 설정할때 Name과 맞춰주면 된다.

### .on()
```tsx
    socket.on('room logs', function (data) {
      setRoomLog(data)
    })
```



















완벽한 싱글톤은 아니지만 static으로 두고 생성후 그걸 재사용하고 있다고 함 connect()를 여러번 호출한게 아니라
기존 소켓을 그대로반환

싱글톤 패턴이란 클래스의 인스턴스를 오직 하나만 생성하도록 보장하는 디자인 패턴이다.
이는 메모리 낭비를 줄이고 객체의 일관성을 유지하는데 도움이 된다고 함

private static 오직 자기 자신 클래스 내부에서만 사용이 가능하다.


```tsx
class socket {
  // 웹소켓 연결 함수
  private static instance: any | null = null;
  static connect = () => {
    if (!this.instance) {
      console.log('[WEB SOCKET] Connect 했음');
      this.instance = io(SOCKET_URL, {
        transports: ['websocket'],
      });

      this.instance.on('connect', () => {
        console.log('Connect');
      });

      this.instance.on('connect_error', (error: any) => {
        console.error('error:', error);
      });
    }
    return this.instance;
  };

  static disconnect = () => {
    if (this.instance) {
      this.instance.disconnect();
      console.log('disconnect');
      this.instance = null;
    } else {
      Toast.error('이미 없음');
    }
  };

  static createDevice = (phoneNumber: string) => {
    if (this.instance) {
      this.instance.emit('CreateDevice', {
        relayServerAddr: SOCKET_URL,
        phoneNumber,
      });
      console.log('CreateDevice', this.instance, phoneNumber);
    }
  };
  static MakeCall = (phoneNumberCust: string) => {
    // 이게 전화 상태인 듯 (2 이거나 -6 일때만 전화를 걸고 아니면 전화를 걸게 하면 안됌)
    // stateConnect == 2 || stateConnect == -6

    if (this.instance) {
      this.instance.emit('real cick', {
        phoneNumberCust,
      });
      console.log('MakeCall', this.instance, phoneNumberCust);
    }
  };
}

export default socket;
```
