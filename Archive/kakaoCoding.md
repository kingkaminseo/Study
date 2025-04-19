# 카카오 코딩테스트풀고 느낀점
카카오 블라인드 테스트에 출제되었던 1차를 풀어보았다.  

## 문제: 비밀지도
#### 난이도: 하
네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다.   
그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다.  
다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.  

1. 지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 “공백”(“ “) 또는 “벽”(“#”) 두 종류로 이루어져 있다.
2. 전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 “지도 1”과 “지도 2”라고 하자. 지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다. 지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.
3. “지도 1”과 “지도 2”는 각각 정수 배열로 암호화되어 있다.
4. 암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.

![secret8](https://github.com/user-attachments/assets/05f86bf2-783a-4a83-9370-97afcf0cf3b6)  
네오가 프로도의 비상금을 손에 넣을 수 있도록, 비밀지도의 암호를 해독하는 작업을 도와줄 프로그램을 작성하라.

## 입력 형식  
입력으로 지도의 한 변 크기 n 과 2개의 정수 배열 arr1, arr2가 들어온다.  

1 ≦ n ≦ 16  
arr1, arr2는 길이 n인 정수 배열로 주어진다.  
정수 배열의 각 원소 x를 이진수로 변환했을 때의 길이는 n 이하이다. 즉, 0 ≦ x ≦ 2^n - 1을 만족한다.  
출력 형식  
원래의 비밀지도를 해독하여 "#", 공백으로 구성된 문자열 배열로 출력하라.  
## ex
|매개변수|값|
|--------|---|
|n|5|
|arr1|[9, 20, 28, 18, 11]|
|arr2|[30, 1, 21, 17, 28]|
|출력|[ '#####', '# # #', '### #', '#  ##', '#####' ]|

|매개변수|값|
|--------|---|
|n|6|
|arr1|[46, 33, 33 ,22, 31, 50]|
|arr2|[27 ,56, 19, 14, 14, 10]|
|출력|[ '######', '###  #', '##  ##', ' #### ', ' #####', '### # ' ]|

## 내 풀이
```js
// Kakao Tech 비밀지도 문제
function decoding(n, arr1, arr2) {
  let answer = [];
  const list1 = binaryNumberList(n, arr1);
  const list2 = binaryNumberList(n, arr2);
  for (let i = 0; i < n; i++) {
    let data = [];
    for (let j = 0; j < n; j++) {
      data.push(list1[i][j] === '#' || list2[i][j] === '#' ? '#' : ' ');
    }
    answer.push(data.join(''));
  }
  return answer;
}

function binaryNumberList(n, arr1) {
  let list = [];
  for (let i = 0; i < arr1.length; i++) {
    let number = Number(arr1[i]).toString(2);
    let limit = n - Number(arr1[i]).toString(2).length;
    if (limit != 0) {
      const a = number.split('');
      for (let j = 0; j < limit; j++) {
        a.unshift('0');
      }
      list.push(a.join('').replaceAll(1, '#').replaceAll(0, ' '));
    } else {
      list.push(number.replaceAll(1, '#').replaceAll(0, ' '));
    }
  }
  return list;
}
```

## 느낀점
내가 생각했던 대로 잘 풀었던 거 같았다.  
난이도 하여서 그런지 생각보다 어렵지 않고 재밌게 풀었다.  
근데 너무 무식하게 풀었나 생각이 들기도 하고..  
분명 다시하라하면 더 이쁘게 할 수 있을텐데 그건 나중에 하겠다.
js 내장함수 중 `padStart`가 있는데 풀때 생각이 나질 않아서 고생조금 했다. 

> 출처
> https://tech.kakao.com/posts/344
