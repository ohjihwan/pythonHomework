# 1단계: 빌드
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -D sass-embedded
RUN npm run build

# 2단계: 정적 파일 서빙
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
