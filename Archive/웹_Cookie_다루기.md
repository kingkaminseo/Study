# Web Cookie를 배워보자
오늘은 쿠키가 뭔지, 쿠키의 용도와 사용방법에 대해 알아보겠다.

## Web Cookie🍪 란?
웹 쿠키란 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각으로 `key = value` 형식의 문자열 데이터 묶음이다.
브라우저는 이 문자열 데이터 조각들을 저장해놓았다가 동일한 서버에 재 요청시 쿠키 데이터를 전송할 수 있다.

이를 이용하면 **로그인 상태 유지** 같은 기능들을 만들 수 있다.
이는 stateless속성을 가진 Http 프로토콜에서 브라우저의 상태 정보를 기억할 수 있게 하는 방법이다.
