# 🐍 PythonHomework – React + Flask Fullstack Example

이 프로젝트는 React(Vite) 프런트엔드와 Flask 백엔드를 통합한 로그인·회원가입·보호 페이지 예제입니다. Docker로 손쉽게 실행하며, 인증은 JWT, 저장소는 SQLite를 사용합니다.

pythonHomework-main/
├─ Dockerfile                ← 프런트 빌드 → 백엔드 통합(멀티스테이지)
├─ docker-compose.yml        ← Flask 5000 포트 실행
├─ package.json              ← 동시 실행 스크립트(npm run dev)
├─ backend/
│  ├─ app.py                 ← Flask 진입점(JWT, API, 정적서빙)
│  ├─ models.py              ← SQLAlchemy User 모델
│  └─ requirements.txt       ← Flask, CORS, SQLAlchemy, bcrypt, PyJWT 등
└─ frontend/
   ├─ vite.config.js         ← /api 프록시 설정(개발용)
   ├─ index.html
   └─ src/
      ├─ main.jsx
      ├─ App.jsx             ← /login, /signup, /content 라우팅
      ├─ assets/
      │  ├─ js/apiClient.js  ← Axios 인스턴스(JWT 자동 첨부, 401 처리)
      │  └─ scss/style.scss  ← 전반 스타일
      └─ pages/
         ├─ Login.jsx
         ├─ Signup.jsx
         └─ Content.jsx

실행 방법(세 가지)
1) Docker 실행(권장):  
   cd pythonHomework-main → docker compose up --build → 브라우저에서 http://localhost:5000  
   빌드 흐름: Node로 React 빌드(frontend/dist) → Python 이미지에 복사 → Flask가 정적+API 서빙  
   DB 경로: 컨테이너 /app/instance/db.sqlite3

2) 로컬 분리 실행(개발용):  
   백엔드 → cd backend → python -m venv .venv → (Windows) .venv\Scripts\activate / (macOS/Linux) source .venv/bin/activate → pip install -r requirements.txt → python app.py (http://localhost:5000)  
   프런트엔드 → cd frontend → npm install → npm run dev (http://localhost:5173)  
   주의: vite.config.js 가 /api 요청을 백엔드로 프록시함(로컬 단독이면 target을 http://localhost:5000 으로).

3) 루트에서 동시 실행(Windows 가정):  
   cd pythonHomework-main → npm install → npm run dev  
   package.json 이 .venv\Scripts\python.exe 경로를 가정하므로 OS/경로가 다르면 직접 2) 방식으로 실행.

API 요약
- POST /api/signup  Body { userid, password } → { status, message } (409: 중복, 400: 누락)
- POST /api/login   Body { userid, password } → { status, token } (not_found / wrong_password)
- GET  /api/protected Header Authorization: Bearer <JWT> → { status, message: "안녕하세요, <userid>님!" }

프런트엔드 핵심
- React 19, Vite 7, React Router 7, Axios, SCSS(sass-embedded)  
- apiClient.js 가 sessionStorage.token 을 Authorization 헤더에 자동 첨부, 401 시 토큰 제거 후 /login 이동  
- /login 성공 → 토큰 저장 → /content 접근 시 /api/protected 호출로 검증

백엔드 핵심
- Flask, Flask-CORS, Flask-SQLAlchemy, bcrypt(비밀번호 해시), PyJWT(JWT)  
- SQLite 파일 자동 생성(backed/instance/db.sqlite3)  
- Flask 정적 서빙: static_folder="frontend/dist", SPA 라우팅 지원

빌드·배포 흐름
- 개발: 프런트 npm run dev + 백엔드 python app.py  
- 프로덕션: 프런트 npm run build → frontend/dist 생성 → Flask가 정적 서빙  
- 컨테이너: docker compose up --build 로 통합 이미지 실행

빠른 테스트 시나리오
1. /signup 에서 회원가입 → 완료 메시지 확인  
2. /login 에서 로그인 → 토큰 발급 및 저장  
3. /content 진입 → "안녕하세요, <userid>님!" 확인  
4. 토큰 삭제 후 /content 접근 → 401 처리 및 /login 리다이렉트

운영 시 개선 포인트
- SECRET_KEY·DB 경로·JWT 만료시간을 .env/환경변수로 이동  
- CORS 화이트리스트 도메인만 허용  
- Axios 인스턴스(apiClient.js) 단일화 및 에러 포맷 통일  
- Flask 단일 프로세스 대신 gunicorn(+nginx) 적용, /healthz 헬스체크 추가

라이선스
- MIT © 2025. 교육/실습 목적의 예제이며 자유롭게 수정·재사용 가능합니다.
