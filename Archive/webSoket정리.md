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
