FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# ✅ DB 생성 가능하도록 퍼미션 부여
RUN mkdir -p /app/instance && chmod -R 777 /app/instance

EXPOSE 5000

# ✅ 로그 실시간 출력
ENV PYTHONUNBUFFERED=1

CMD ["python", "app.py"]