# E2E 테스트로 보는 사용자 여정

최근 프로젝트에서 테스트 코드를 작성하면서 “아, 이래서 E2E 테스트가 필요하구나” 싶은 순간이 있었다.  

개발자는 보통 코드를 보고 "문제없겠지"라고 생각하지만,   
실제 사용자는 버튼을 누르고, 페이지를 이동하고, 텍스트를 입력한다.   
이 과정에서 문제가 생기는 경우도 생각보다 많다.  

이처럼 **사용자가 실제로 겪는 흐름**을 처음부터 끝까지 점검하기 위해 나는 E2E(End-to-End) 테스트를 도입했다.  

## E2E란?
E2E(End-to-End) 테스트는 여러 하위 시스템으로 구성된 애플리케이션의 기능 및 데이터 흐름을 종합적으로 테스트하는  
소프트웨어 테스트 방법론이다.

쉽게 말해 개발물을 사용자 관점에서 테스트 하는 방법이다.  
페이지에서 원하는 텍스트가 제대로 출력이 되었는지, 버튼을 클릭 했을 때 올바른 동작을 수행하는 지 등을 테스트한다.

워크플로우가 복잡해질수록, 이를 사용자 관점에서 테스트하고 확인하는 일이 중요해지는데,  
E2E 테스트는 이 과정을 자동화로 구현하여 반복적인 테스트작업 없이 전체 흐름을 검증할 수 있게 해준다. 

## 프레임워크 선택
E2E의 프레임워크로는 cypress, Seleninum과 Playwright중에서 Playwright를 선택하였다.  
Selenium은 사용하는 브라우저와 드라이버 버전이 서로 맞아야 하며,   
버전이 맞지 않을 경우 테스트가 중단되거나 제대로 실행되지 않을 수 있다.   
하지만 Playwright의 경우 브라우저 버전에 관계없이 테스트를 진행해주고 또 다양한 브라우저에서 동시에 테스트를 진행하여 결과를 보여준다.  
이뿐만이 아니라 Playwright에서 테스트를 병렬실행하여 리소스를 단축시킬 수 있었고 인터셉트도 가능하여 네트워크 요청을 수정할 수 있다.  
cypress와 비교해서도 속도나 안정성, 사용률 등을 고려하여 선택하였다.  
  
위 장점들의 이유로 나는 Playwright를 사용하였다.  

## Playwright 소개
> Playwright enables reliable end-to-end testing for modern web apps.

Playwright는 최신 웹 애플리케이션을 위한 신뢰할 수 있는 End-to-End 테스트를 지원하는 프레임워크이다.  
다양한 브라우저 환경(Chromium, Firefox, WebKit)에서 사용자 행동을 자동화하여,  
복잡한 사용자 플로우도 안정적으로 테스트할 수 있게 도와준다.  

## Playwright 사용하기
### 설치
```
npm init playwright@latest
```
아래 명령어를 사용하여 빠르게 설치할 수 있다.

### 자주 사용하는 명령어

| 기능                         | 예시 코드 |
|------------------------------|-----------|
| 페이지 이동                | ```await page.goto('https://example.com')``` |
| 텍스트 클릭                | `await page.click('text=로그인')` |
| 버튼 클릭                  | `await page.click('button[type="submit"]')` |
| 입력 필드에 텍스트 입력    | `await page.fill('input[name="email"]', 'test@example.com')` |
| 비밀번호 입력              | `await page.fill('input[name="password"]', '1234')` |
| 체크박스 체크              | `await page.check('input[type="checkbox"]')` |
| 라디오 버튼 선택           | `await page.check('input[value="option1"]')` |
| 드롭다운 옵션 선택         | `await page.selectOption('select#language', 'ko')` |
| 요소의 텍스트 확인         | `await expect(page).toHaveText('환영합니다')` |
| URL 확인                   | `await expect(page).toHaveURL(/dashboard/)` |
| 요소가 보이는지 확인       | `await expect(page.locator('h1')).toBeVisible()` |
| 스크린샷 저장              | `await page.screenshot({ path: 'screenshot.png' })` |
| 콘솔 로그 출력             | `page.on('console', msg => console.log(msg.text()))` |
| 일정 시간 대기             | `await page.waitForTimeout(1000) // (1초)`  |
| 특정 요소 로딩 대기        | `await page.waitForSelector('text=완료')` |

실제 Playwright를 사용하면서 자주사용했던 문법들을 정리해보았다.  
내부 코드를 보여줄 수 없어 이렇게 알려주는 점 이해 부탁드립니다..


### 테스트코드 실행
```
npx playwright test
```
```
npx playwright test tests/testCode.spec.ts
```
<img width="725" alt="981c1b2b-dc7e-4b85-b241-272b44da6628" src="https://github.com/user-attachments/assets/583b938e-0c7d-4ec7-b7eb-98e09ced2e68" /><br/>
위 명령어를 사용하여 테스트 코드를 작성할 수 있고 다음과 같이 결과를 확인할 수 있다.

### HTML Report 확인하기
```
npx playwright show-report
```
<img width="1151" alt="38ec17a7-9e61-4002-b137-a93812765501" src="https://github.com/user-attachments/assets/5997ae35-e3a8-4a1c-a911-4f2ae5fde00a" /><br/>
Playwright에서는 테스트 실행 결과를 시각적으로 확인할 수 있는 HTML 리포터를 제공해준다.  
테스트를 실행한 후 아래 명령어를 입력하면 자동으로 생성된 HTML 리포트를 확인할 수 있다.  
HTML 리포터에서는 더 자세한 정보들을 확인할 수 있다.    
테스트가 성공했는지 실패했는지 여부, 각 테스트가 실행된 브라우저별 결과, 그리고 각 테스트에 걸린 시간 등 을 확인할 수 있다.  
또한 테스트 실행 흐름을 트리 구조로 시각화해주기 때문에 어떤 테스트가 어떤 순서로 실행되었는지도 쉽게 파악할 수 있었다.  
