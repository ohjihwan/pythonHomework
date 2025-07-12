# 🔹 1단계: React 빌드 (프론트엔드)
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/ ./
RUN npm install && npm run build

# 🔹 2단계: Flask 백엔드 + 빌드된 프론트 포함
FROM python:3.10
WORKDIR /app

# 의존성 설치
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 빌드된 React를 backend로 옮김
COPY --from=frontend-build /frontend/dist ./frontend/dist

# Flask 코드 복사
COPY backend/ ./

# DB 경로 만들기
RUN mkdir -p /app/instance && chmod -R 777 /app/instance

# 실시간 로그
ENV PYTHONUNBUFFERED=1

EXPOSE 5000
CMD ["python", "app.py"]
