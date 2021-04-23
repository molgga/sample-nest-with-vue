## NPM scripts

app:\* 으로 시작하는 스크립트는 server 패키지와 client 패키지 모두 실행 합니다. \
예를 들어 app:bootstrap 은 server, client 의 node package 를 설치하고, 프로젝트 초기 작업을 진행합니다.

### # app:bootstrap

server/client node package 설치하고, 프로젝트 초기 작업을 진행합니다.

```bash
$ npm run app:bootstrap
```

### # app:serve

server/client 를 build & watch 모드로 시작합니다.

- build 버전의 기본 Port 는 8888 입니다.
- build 버전은 클라이언트 hotreload 가 지원되지 않습니다.
- 서버(nestjs)를 통한 static serving 을 하기 때문에 클라이언트는 build watch 모드로 실행됩니다.

### # app:serve:with-hot

server/client 를 build & watch 와 함께 클라이언트 hotreload 모드를 시작합니다.

- hotreload 버전의 기본 Port 는 8081 입니다.
- 서버를 통해 서빙하는 8888, 핫리로드로 서빙하는 8081 두개의 서버가 실행 됩니다.

8888 과 8081 모두 동일한 클라이언트 화면을 출력하는것으로 보일테지만 큰 차이점이 있습니다. \
8888 은 nestjs를 통해 클라이언트 파일을 서빙하기 때문에, 제어권이 nestjs 에 있습니다.

예를 들어, ServeStaticModule 구성에 /api\* 를 클라이언트 서빙에서 제외 되도록 해두었습니다.

- :8888/api/unknown-path \
  = ServeStaticModule 에 /api\* 를 제외했기 때문에, 404 오류 핸들링을 nestjs 에서 합니다.
- :8081/api/unknown-path \
  = 404 오류 핸들링을 vue 에서 합니다.

- :8888/some-path/unknown-path \
  = nestjs 에 등록된 path 가 아니라면, vue 로 넘어갑니다. (오류 핸들링을 vue 에서 합니다.)
- :8081/some-path/unknown-path \
  = 404 오류 핸들링을 vue 에서 합니다.

### # app:build

server/client 를 build 합니다.

### # app:start

server/client 를 build & (pm2) start 합니다.

보통 배포 단계에서 배포 스크립트를 작성하게 된다면, 아래와 같이 구성할 수 있습니다.

```bash
# production
$ npm run app:build:production
  # 스크립트 내부는 이런식으로 구성이 되겠죠
  # NODE=production npm run my-client-build
  # NODE=production npm run my-server-build
$ npm run app:start:production
  # 스크립트 내부는 이런식으로 구성이 되겠죠
  # NODE=production npm run my-app

# development
$ npm run app:build:dev
  # 스크립트 내부는 이런식으로 구성이 되겠죠
  # NODE=development npm run my-client-build
  # NODE=development npm run my-server-build
$ npm run app:start:dev
  # 스크립트 내부는 이런식으로 구성이 되겠죠
  # NODE=development npm run my-app
```
