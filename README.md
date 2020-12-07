<p align="center">
  <a href="https://subtalk.devhak.com">
    <img src="./src/styles/images/logo.svg" alt="review" width="80" height="80" />
  </a>
</p>
<h1 align="center"><a href="https://subtalk.devhak.com">SUB_TALK</a></h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/9564af1f-08b2-44ea-add7-5704b6fbaff9/deploy-status)](https://app.netlify.com/sites/subtalk/deploys)

## Introduction

**SUBTALK** 은 현재 위치를 기반으로 실시간 지하철 정보를 통해 같은 열차에 탄 이용객끼리 채팅할 수 있는 웹 어플리케이션 입니다.

#### 미리보기
<img src="./src/styles/images/preview.gif" height="400" alt="preview" >


## Contents

1. [Requirements](#Requirements)  
2. [Installation](#Installation)
3. [Features](#Features)
4. [Skills](#Skills)
5. [Test](#Test)
6. [Deployment](#Deployment)
7. [Version Control](#Version-Control)
8. [Challenges](#Challenges)
9. [Things to Do](#Things-to-Do)


---

## Requirements

- Chrome Browser를 권장합니다.
- [Google API]('https://console.developers.google.com') 키가 있어야 합니다.
- [서울시 열린데이터 광장]('https://data.seoul.go.kr/')에서 받은 일반 인증키와 실시간 지하철 인증키가 모두 있어야 합니다.


## Installation

### Client

```javascript
git clone https://github.com/hakyung-dev/subtalk-client
cd subtalk-client
npm install
npm run dev
```

#### Environment Variables

- 루트 디렉토리에 `.env.local` 파일 생성
- 하단의 변수와 발급받은 값 추가
```
REACT_APP_GOOGLE_MAPS_KEY=Google API KEY
```

### Server

```javascript
git clone https://github.com/hakyung-dev/subtalk-server
cd subtalk-server
npm install
npm run dev
```

#### Environment Variables

- 루트 디렉토리에 `.env` 파일 생성
- 하단의 변수와 발급받은 값 추가
```
SUBWAY_STATION_KEY=지하철 인증키
REACT_APP_REALTIME_KEY=실시간 지하철 인증키
```



## Features

1. 사용자 설정
   - 사용자가 희망하는 이름을 설정
   - 동명이인일 경우를 대비하여, 중복되지 않는 아이디를 생성해 구분

2. 사용자의 위치
   - geolocation 통해 현재 위치를 지도 중앙(기준점)으로 설정
   - 오픈 API 정보를 Google Maps API에서 사용할 수 있도록 좌표계 변환
   - 현재 위치 기준, 주변 지하철 역 10개 표시, 선택 가능
   - 사용자와 열차의 이동하는 변화를 정기적으로 파악하여 채팅 참여 자격 설정
   - 상단에 위치 파악 상태 표시

3. 지하철 정보
   - 지하철 역 마커를 클릭하면 지하철 역 정보, 실시간 도착 정보 표시
   - 호선별 특정 색상에 맞춰 지하철 역 표시
   - 실시간 도착 정보는 도착코드 혹은 카운트 되는 시간으로 표시

4. 실시간 채팅
   - 각 도착정보를 지닌 열차는 채팅방을 의미
   - Socket.io를 통해 열차 이용객끼리 실시간 채팅
   - 사용자의 위치와 열차의 현 위치가 기준점 이상 벗어날 경우 자동으로 채팅 정지



## Skills

### Client-side

- ES2015+
- 컴포넌트 기반 아키텍쳐를 위한 React
- Redux를 이용한 State 관리
- React Router
- Axios
- Socket.io
- proj4를 이용하여 좌표계 변환
- Sass(Scss)
- 서울시 오픈 API 사용 : 서울시 좌표기반 근접 지하철역 정보, 서울시 지하철 실시간 도착정보, 서울시 역사 정보, 실시간 열차 위치 정보
- Google APIs 사용 : Google Maps JavaScript API


## Test

- Jest를 이용한 Reducer Test


## Deployment

### Client-Side

- Netlify를 통한 배포 자동화

### Server-Side

- AWS Elastic Beanstalk을 통한 서버 배포


## Version Control

- GitHub
- Trello를 이용한 Task Management


## Challenges

- 서울시 오픈 API에서 사용하는 좌표계는 EPSG5181, Google Maps가 사용하는 좌표계는 WGS84로 서로 달라 적용하는 데 어려움이 있었습니다. 좌표계라는 것 자체가 익숙지 않아 접근이 어려웠는데, 좌표계의 이름과 그것의 대략적인 원리를 파악했고, 좌표계 개별 공식을 이용하여 변환할 수 있다는 것을 알게 되었습니다. 변환 시 Proj4가 이용된다는 것을 알게 되어 적용할 수 있었습니다.
- 카운트 다운을 표현할 때, 처음엔 useEffect에 직접 적용하여 진행하였습니다. 초반엔 잘 진행이 되는 듯하였는데 시간이 흐를수록 차이가 커지며 오류가 발생하였습니다. 그래서 setTimeout을 실행시키는 함수를 분리하여 그 함수를 useEffect에 적용하는 방법으로 오류를 해결 할 수 있었습니다. React Hooks에 관해 공부할 수 있었습니다.
- 지하철역 표시할 때, 지하철별 고유 색상이 달라서 어떻게 표현해야 할지 고민했는데, Sass(Scss)의 반복문 `@each`를 사용하여 해결 할 수 있었습니다.



## Things to Do

- 실시간 정보 정확도 높이기
- 컴포넌트 재사용을 위한 리팩토링
- End to End 테스트 코드 작성
- 통합 테스트 작성
