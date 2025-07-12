FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /app/instance && chmod -R 777 /app/instance

EXPOSE 5000

ENV PYTHONUNBUFFERED=1

CMD ["python", "app.py"]