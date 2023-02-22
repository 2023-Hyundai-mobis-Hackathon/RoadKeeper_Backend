# RoadKeeper_Backend
YOLOv5 기반 객체 인식 및 분류 기능를 통한 도로 위험물 신고, 알림 어플리케이션 서비스
<br>

## 시연 방법
```bash
  git clone https://github.com/2023-Hyundai-mobis-Hackathon/RoadKeeper_Backend.git
```
### 해당 위치로 이동
```bash
  npm i or npm install
```
.env파일 작성 (database)

### 시작하기
```bash
  npm start
```
<br>

## Tech Stack
- Express.js
- MongoDB
- AWS EC2

## Floder Map
```bash
* 📦 RoadKeeper_Backend
  ├──  package-lock.json
  ├──  package.json
  ├──  README.md
  ├──  src
  │   ├──  app.js
  │   ├──  config
  │   │   └──  config.js
  │   ├──  routes
  │   │   ├──  archive
  │   │   │   ├──  archive.ctrl.js
  │   │   │   └──  index.js
  │   │   ├──  db.js
  │   │   ├──  main
  │   │   │   ├──  main.ctrl.js
  │   │   │   └──  index.js
  │   │   ├──  index.js
  │   │   ├──  info
  │   │   │   ├──  index.js
  │   │   │   └──  info.ctrl.js
  │   │   └──  result
  │   │       ├──  index.js
  │   │       ├──  result.ctrl.js
  │   │   │   └──  src(python files)
  └── └──  server.js

```

<br>

## 개발 환경
### Software requirement
- Visual Code + node
