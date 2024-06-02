### 👻 Hello Project
![image](https://github.com/97Project24/say-hello/assets/99783474/bcb660c6-5798-4924-9e8b-d2c37f23a8b5)


> ✅ Check Point 1 : 프론트엔드와 백엔드를 분리하여 `Spring boot`를 통해 데이터 처리, 비즈니스 로직 구현과 `React` 컴포넌트 기반 아키텍처를 통해 재사용 가능한 UI 요소를 쉽게 만들 수 있는가? 
>
> ✅ Check Point 2 :  `Spring boot`와 `React` 연동 시 CROS 관련 오류 방지를 하기 위해 `Proxy` 를 설정할 수 있는가?



🏷️ `Hello Project` 의 목표 : `Spring boot` 와 `React` 개발 환경 연동하여 `say hello` 출력하기

* `Spring boot Controller` : HTTP 요청 처리, 클라이언트의 요청을 받아 처리하는 비즈니스 로직과 데이터를 연결
  * Request Mapping(요청 매핑), Request Handling(요청 처리), Reponse Creation(응답 생성), Data Binding(데이터 바인딩) 및 검증

---

* **Commit message** 
  * feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
  * fix : 기능에 대한 버그 수정
  * style : 코드 스타일, 포맷팅에 대한 수정
  * docs : 문서(주석) 수정

---



##### 1. Spring initializer

> `Sprign boot` 프로젝트 ` Spring initializer` 를 사용하여 생성하기 
>
> `https://start.spring.io/`

![image-20240602214443569](https://raw.githubusercontent.com/oiosu/image_repo/master/img/image-20240602214443569.png)



#### 2.프로젝트 생성 후 실행하기

> `localhost:8080`

![image-20240602214653005](https://raw.githubusercontent.com/oiosu/image_repo/master/img/image-20240602214653005.png)

> * java 버전이 맞지 않아 에러가 발생할 경우 `settings > gradle> (build aand run using, run tabs using) 모두 intelliJ IDEA 로 맞춰주기`



#### 3. React 설치하기

> `scr` > `main` 파일에 리액트 설치하기 

```bash
$ npx create-reeact {프로젝트명}
```

```bash
$ npx create-react-app frontend
```

* 터미널에서 `npm start` 명령어 입력과 함께 실행하기 

> `localhost:3000`

![image-20240602215108434](https://raw.githubusercontent.com/oiosu/image_repo/master/img/image-20240602215108434.png)



#### 4. CORS 관련 오류 방지를 위해 proxy 설정하기

---

* `CORS (Cross Origin Resource Sharing)`에 대한 2가지 궁금증 

  * CORS? : 프로토콜 또는 포트에서 리소스를 요청할 수 있도록 하는 보안 기능이다. CORS는 웹 애플리케이션의 보안 모델인 동일 출처 정책을 완화하기 위해 사용

    * 동일 출처 정책? (Same-Origin Policy)

      > 웹 브라우저가 다른 출처에서 로드된 문서나 스크립트가 현재 문서의 콘텐츠에 접근하는 것을 제한하는 보안 기능 

  * CORS 관련 오류를 왜 방지해야 하지? 

    * 클라이언트가 다른 출처에서 리소스를 요청할 때 서버가 올바른 CORS 헤더를 포함하지 않으면 발생
    * 이러한 오류는 보안상의 이유로 클라이언트에서 리소스를 로드하지 못하도록 함 
    * 사용자 경험개선,  기능적 요구사항(서버간의 원활한 데이터 통신보장), 보안유지(CORS 설정 통해 특정 출처에만 접근하도록 허용) 하기 위함

---



##### (1)  `main` > `frontend` 파일에 필요한 모듈 설치하기 

```bash
$ npm install http-proxy-middleware --save
```



##### (2) `frontend` > `src` > `setProxy.js` 파일 생성하기 

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',	# 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};
```

> `http-proxy-middleware` 패키지를 사용하여 proxy를 생성하고 express 애플리케이션에 적용 
>
> * `target` : proxy가 요청을 보낼 대상 서버의 주소 
> * `changeOrigin`  : 서버의 올바른 도메인을 설정하기 위해 요청 헤더의 호스트를 대상 서버 주소로 변경 
>   * `true` : 요청 헤더의 호스트가 프론트엔드 서버의 호스트에서 대상 서버의 호스트로 변경된다. 
>   * `false` : proxy 서버는 클라이언트로부터 받은 요청을 대상 서버에 전달 할 때 요청 헤더의 호스트를 수정하지 않는다. 



#### 5. Axios를 이용하여 백엔드와 프론트엔드 통신 쉽게 하기

##### 1. `frontend` 폴더에 `axios` 설치하기 

```bash
$ npm install axios --save
```



##### 2. `App.js` 코드 작성하기 

```javascript
import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div className="background-image">
           <div className="content">
               {hello}
           </div>
        </div>
    );
}

export default App;
```

> * `useState()` : `hello` 라는 상태변수와 이를 업데이트하는 `setHello` 함수 정의
>
> * `useEffect()` : 컴포넌트가 렌더링 될 때 한 번 만 실행되는 비동기 요청 처리 
>
>   * `/api/hello` GET 요청을 보내고 서버에서 받은 응답 데이터를 `setHello()` 함수를 통해 상태변수 `hello` 에 저장한다. 
>
>   * 🤔 상태변수? : 리액트에서 컴포넌트의 상태(state)를 관리하기 위해 사용되는 변수이다. 
>
>     이 상태는 컴포넌트의 데이터를 나타내는 값이며 상태 변수를 사용하여 컴포넌트가 렌더링 될 때 변하는 데이터를 관리하고 업데이트를 할 수 있다. 
>
> * `axios` : HTTP 요청을 보내기 위해 `axios` 라이브러리를 사용, 완료되면 `response.data` 에 서버에서 반환한 데이터가 포함된다. 

> 브라우저에서 로드될 때 한 번 만 서버에 GET 요청ㅇ르 보내고, 응답을 받아와 화면에 출력한다. 사용자는 화면에 서버에서 반환된 데이터를 볼 수 있다. 



##### (3) `Controller` 패키지 생성하기 

> `SayhelloController.java`

```java
package com.hello.sayhello.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SayhelloController {

    @GetMapping("/api/hello")
    public String test() {
        return "Say Hello!! 👻";
    }
}
```

> * `@RestController` = @Controller + @ResponseBody : HTTP 요청을 처리하고 해당 요청에 대한 응답을 반환하는 역할
> * `@GetMapping` :  GET 요청을 처리하는 메서드 (`/api/hello` 경로로 들어오는 GET 요청 처리)



#### 6. `package.json` 

> `frontend` > `src` > `package.json`

```javascript
 "proxy": "http://localhost:8080",
```

> * React 애플리케이션에서 API 요청을 보낼 때, 개발 서버가 아닌 백엔드 서버로 요청을 전송하기 위해 위와 같이 추가한다. 

```
프론트엔드 개발 서버 : localhost:3000
백엔드 개발 서버 : localhost:8080
위와 같이 별로도 실행된다 개발 서버는 React 코드를 호스팅하고 백엔드 서버는 API 를 제공하는데 이 두 서버는 보안상의 이유로 기본적으로 다른 포트를 사용한다. 하지만 이것은 브라우저 보안 정책으로 다른 출처의 자원에 직접 접근할 수 없기에 프론트엔드 개발 서버에서 API 요청을 보낼 때 해당 요청을 백엔드 서버로 proxy하는 것이 일반적인 접근 방법이다. 
따라서 위와 같은 코드를 추가하면 개발 서버는 포트 8080에서 실행중인 백엔드 서버로 API를 proxy 하게 된다 CORS 오류를 방지하면서 개발 시에도 개발 서버에서 백엔드 서버로의 API요청을 편리하게 보낼 수 있다. 
```





#### 7. 완성된 파일 구조 및 스타일링

![image-20240602223342933](https://raw.githubusercontent.com/oiosu/image_repo/master/img/image-20240602223342933.png)



 ![image-20240602223441837](https://raw.githubusercontent.com/oiosu/image_repo/master/img/image-20240602223441837.png)

![image-20240602223601162](https://raw.githubusercontent.com/oiosu/image_repo/master/img/image-20240602223601162.png)
=======



