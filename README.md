# 🐍 PythonHomework – React + Flask Fullstack Example (Styled & Detailed)

이 프로젝트는 **로그인 페이지를 중심**으로 한 **React(Vite) + Flask** 통합 예제입니다. 목표는 **“로그인부터 보호 자원 접근까지”**의 전 과정을 실무적으로 구현하면서, **Python 서버 측 고급 기술(보안·구조화·성능·테스트 관점)**을 자연스럽게 녹여내는 것입니다. Docker로 즉시 실행 가능하며, 인증은 **JWT(HS256)**, 비밀번호는 **bcrypt**, 저장소는 **SQLite + SQLAlchemy**를 사용합니다.

pythonHomework-main/
├─ Dockerfile                ← 멀티스테이지(React 빌드 → Flask 통합 이미지)
├─ docker-compose.yml        ← 5000 포트로 Flask 기동
├─ package.json              ← 동시 실행 스크립트(npm run dev)
├─ backend/
│  ├─ app.py                 ← Flask 진입점(JWT, API, 정적서빙)
│  ├─ models.py              ← SQLAlchemy User 모델
│  └─ requirements.txt       ← Flask, CORS, SQLAlchemy, bcrypt, PyJWT 등
└─ frontend/
   ├─ vite.config.js         ← /api 프록시(개발용)
   ├─ index.html
   └─ src/
      ├─ main.jsx
      ├─ App.jsx             ← /login, /signup, /content 라우팅
      ├─ assets/
      │  ├─ js/apiClient.js  ← Axios 인스턴스(JWT 자동 첨부, 401 처리)
      │  └─ scss/style.scss  ← 전역 스타일(이 파일에서 디자인 토큰 관리)
      └─ pages/
         ├─ Login.jsx        ← 로그인 화면(UI/UX 핵심)
         ├─ Signup.jsx
         └─ Content.jsx      ← 보호 페이지(JWT 검증)

실행(세 가지)
1) Docker(권장): `cd pythonHomework-main` → `docker compose up --build` → 브라우저 `http://localhost:5000`
2) 로컬 분리:
   - 백엔드: `cd backend` → venv 생성/활성화 → `pip install -r requirements.txt` → `python app.py` (http://localhost:5000)
   - 프런트: `cd frontend` → `npm i` → `npm run dev` (http://localhost:5173) / 프록시로 `/api`가 백엔드로 전달
3) 루트 동시 실행(Windows 가정): `npm i` → `npm run dev` (경로 상이 시 2) 권장)

API 요약
- `POST /api/signup`  Body `{ userid, password }` → `{ status, message }` (409: 중복, 400: 누락)
- `POST /api/login`   Body `{ userid, password }` → `{ status, token }` (not_found / wrong_password)
- `GET  /api/protected` Header `Authorization: Bearer <JWT>` → `{ status, message: "안녕하세요, <userid>님!" }`

사용 기술(왜 이 스택인가)
- Frontend: **React 19 + Vite 7 + React Router 7 + Axios + SCSS**
  - React 19는 concurrent/SSR 친화 업데이트, Vite는 초고속 개발 서버/빌드.
  - Router 7로 인증 라우팅 경계(공개/보호) 분리.
  - Axios 인스턴스에서 JWT 자동 첨부·401 공통 처리(중복 코드 제거).
  - SCSS로 **디자인 토큰**(색/간격/라운드/그리드) 일원화 → 유지보수 용이.
- Backend: **Flask + SQLAlchemy + PyJWT + bcrypt + CORS**
  - Flask는 라우팅 단순·확장 쉬움, SQLAlchemy로 ORM 안전성/이식성 확보.
  - PyJWT로 경량 토큰 발급/검증, bcrypt로 안전한 비밀번호 해싱.
  - CORS로 개발/운영 도메인 정책 분리.
- Infra/Dev: **Docker 멀티스테이지 빌드, docker-compose, Vite 프록시**
  - 한 이미지에 정적 자원 + API 통합 → 배포 단순화.
  - 개발 시 프록시로 CORS 문제 최소화, 운영 시 정적 서빙을 Flask가 담당.

로그인 페이지 디자인 가이드(프런트 스타일 고도화)
- 레이아웃: 화면 중앙 세로 정렬(모바일 360~), 컨테이너 폭 `min(440px, 90vw)`, 카드 그림자(blur 적당), 배경은 그라데이션 혹은 노이즈 텍스처(시력 피로 완화).
- 타이포: 제목 20–24px, 본문 14–16px, 행간 1.5. 시스템 폰트 스택 사용(`-apple-system, Segoe UI, Roboto, Noto Sans KR`).
- 입력 필드: 높이 48px, 좌우 패딩 12–16px, 라운드 12–14px, 포커스 시 **테두리 + 그림자**(접근성 명확).
- 버튼: 높이 48–52px, 라운드 14–16px, 호버/포커스/비활성 상태 구분(투명도·음영 변환). **로딩 스피너**와 **disabled** 처리.
- 상태/피드백: 에러는 필드 하단 12px 영역에 **명확한 색상/아이콘**으로, 성공/실패 토스트 사용. 키보드 제출(Enter) 가능.
- 접근성: label–input `for/id` 연결, aria-invalid/aria-live 활용, 탭 이동 순서 보장, 명도 대비 WCAG AA.
- 마이크로인터랙션: 제출 성공 시 버튼 미세 스케일 업(90–120ms), 실패 시 가벼운 흔들림(8–12px, 140–180ms), 입력 포커스 인/아웃 페이드(60–100ms).
- 반응형/테마: 모바일 단일 컬럼 → 태블릿에서 좌측 일러스트/우측 폼 2컬럼(그리드), 라이트/다크 전환 시 배경/텍스트 대비 유지.
- 보안 UX: 자동완성 허용(아이디), 비밀번호 필드에 “표시/숨김” 토글, CAPS LOCK 감지 시 안내.

디자인 토큰 제안(style.scss 상단에 선언)
- 색: `--bg:#0F1115; --card:#151922; --primary:#4F8CFF; --danger:#FF5C5C; --text:#E6E9F2; --muted:#9AA3B2; --line:#2A3040;`
- 간격: `--gap-2:8px; --gap-3:12px; --gap-4:16px; --gap-6:24px;`
- 둥글기: `--r-2:8px; --r-3:12px; --r-4:16px;`
- 그림자: `--shadow-1:0 6px 24px rgba(0,0,0,.24);`
- 폰트: `--h1:24px/1.3; --h2:18px/1.4; --body:15px/1.6; --mono: ui-monospace, SFMono-Regular, Menlo;`
- 전환: `--t-fast:120ms; --t-med:200ms;`

폼 검증 UX(간단 규칙)
- 아이디: 4–24자, 영문/숫자/특수문자 허용 범위 안내, 서버 중복 시도 시 즉시 에러 렌더.
- 비밀번호: 8자+, 영문 대/소문자/숫자 조합 권장 메시지, “Caps Lock 켜짐” 감지.
- 비활성화: 둘 중 하나라도 유효하지 않으면 버튼 비활성화.
- 서버 에러: 401/409/422 응답별 차등 메시지(“아이디가 없어요”, “이미 사용 중”, “입력 형식 오류” 등).

보안·고급 Python 서버 설계 포인트(현 구조에 자연스럽게 적용/확장)
- JWT 발급·검증
  - HS256 서명키는 운영에서 **환경변수(SECRET_KEY)** 로 주입, 만료시간(exp) 15–60분 + **Refresh 전략**(옵션).
  - Authorization 헤더 파싱 유틸러티 분리(데코레이터로 인증 보호 라우트 간결화).
- 비밀번호 보관 정책
  - bcrypt 해시(작업비용 12–14), **동일 비밀번호 재사용 방지**(최근 해시 비교 테이블·옵션).
- 입력 검증
  - 서버 단 `marshmallow/pydantic(옵션)`으로 스키마 검증 → 일관된 4xx 응답 포맷 `{ error, detail, field }`.
- 데이터 계층
  - SQLAlchemy 세션 **컨텍스트 매니저**로 트랜잭션 원자성 보장(try/except/rollback).
  - 유니크 인덱스(userid) + DB 레벨 제약으로 경합 시 409 응답 일관화.
- 구조화
  - 모듈 분리 추천: `auth.py(토큰/해시/데코레이터)`, `routes_auth.py(로그인/회원가입)`, `routes_protected.py`, `models.py`, `db.py(세션)`, `errors.py(에러 핸들러)`.
  - Flask **Blueprint** 로 라우트 그룹화(확장·테스트 편의).
- 에러 처리
  - 글로벌 에러 핸들러에서 JWTError/IntegrityError 등 매핑 → JSON 응답 통일, stack 숨김.
- 로깅/관측
  - 구조적 로그(JSON), `X-Request-ID` 추적, `/healthz` 헬스 체크.
- 운영 성능
  - **gunicorn**(워커 2–4) + 프록시 서버(nginx) 권장, 정적은 CDN/프록시 캐시 고려.
- 테스트
  - `pytest` + Flask test client 로 로그인/보호 라우트 **통합 테스트**(성공/실패/만료 케이스).

프런트엔드 구현 메모(파일별 핵심)
- `src/pages/Login.jsx`:
  - 상태: `userid, password, loading, errors`, 제출 시 `apiClient.post("/login")`, 성공 시 `sessionStorage.setItem("token", token")` → `/content`로 이동.
  - 접근성: label/aria, Enter 제출 핸들러, disable/로딩 스피너.
  - 마이크로인터랙션: 성공 scale-up, 실패 shake 애니메이션(translateX ±8px/160ms).
- `src/assets/js/apiClient.js`:
  - baseURL: `/api`, 요청 인터셉터에서 토큰 주입, 응답 인터셉터에서 401 시 토큰 제거 후 `/login` 이동.
- `src/pages/Content.jsx`:
  - 마운트 시 `/api/protected` 호출, 실패 시 로그인으로 복귀. 로딩/오류/콘텐츠 3상태 UI.
- `src/assets/scss/style.scss`:
  - 상단에 디자인 토큰 선언, `.login-card`, `.form-field`, `.btn-primary`, `.toast` 등 **재사용 가능한 유틸/컴포넌트 클래스** 정의.

빠른 시나리오
1) `/signup`에서 새 계정 생성 → 성공 메시지  
2) `/login`에서 로그인 → 토큰 저장/리다이렉트  
3) `/content`에서 보호 데이터 수신 확인  
4) 토큰 삭제/만료 후 재접근 → 401 처리 및 `/login` 이동

운영 체크리스트(필수)
- 환경변수: `SECRET_KEY`, `JWT_EXPIRE_MIN`, `SQLALCHEMY_DATABASE_URI`  
- CORS 화이트리스트(운영 도메인만 허용)  
- HTTPS 강제, 보안 헤더(Strict-Transport-Security, X-Frame-Options 등)  
- 로그/지표: 로그인 실패율, 401/409 비율, 레이턴시, 에러율  

라이선스
- MIT © 2025 — 교육/실습 목적, 자유롭게 수정·재사용 가능.
