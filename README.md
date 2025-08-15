# React Board Server

이 프로젝트는 React 기반 게시판 애플리케이션을 위한 간단한 RESTful API 서버입니다.
사용자, 게시글, 댓글 관리 기능과 인증 및 미들웨어를 제공합니다.
React 개발 학습을 위한 프로젝트로, DB 연결 없이 메모리에 데이터를 저장합니다.

## ✨ 주요 기능
- 👤 사용자 회원가입 및 인증
- 📝 게시글/댓글 CRUD(생성, 조회, 수정, 삭제)
- 🔒 인증 미들웨어 적용
- 🗂️ 개발용 샘플 데이터 제공
- 📁 체계적인 라우트 구조

## 📂 프로젝트 구조
```bash
index.js                # 🚀 서버 진입점
package.json            # 📦 프로젝트 정보 및 의존성

data/                   # 🗂️ 샘플 데이터
  comments.js
  posts.js
  users.js

middlewares/            # 🛡️ Express 미들웨어
  auth.js

routes/                 # 🔗 API 라우트 핸들러
  index.js
  api/
    auth.js
    comments.js
    index.js
    posts.js
    users.js

utils/                  # 🛠️ 유틸리티 함수
  auth.js
  comment.js
  common.js
  post.js

views/                  # 🖥️ HTML 뷰
  api.html

postman/                # 📬 Postman API 테스트 컬렉션
  Local.postman_environment.json
  React Board.postman_collection.json
```

## 🚀 시작하기

### 🛠️ 사전 준비
- Node.js (권장: v14 이상)
- npm

### 📦 설치
```bash
npm install
```

### ▶️ 서버 실행
```bash
node index.js
```

서버는 `index.js`에 지정된 포트(기본값: 3000)에서 시작됩니다.

### 🔗 주요 API 엔드포인트
- `/api/auth` : 👤 사용자 인증
- `/api/posts` : 📝 게시글 관리
- `/api/comments` : 💬 댓글 관리
- `/api/users` : 👥 사용자 관리

자세한 요청 예시는 `postman/` 폴더의 Postman 컬렉션을 참고하세요.

## 🧑‍💻 개발 참고
- 🛠️ 유틸리티 함수: `utils/` 폴더
- 🛡️ 인증 미들웨어: `middlewares/auth.js`
- 🗂️ 샘플 데이터: `data/` 폴더

## 📄 라이선스
MIT
