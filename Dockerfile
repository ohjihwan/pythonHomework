FROM python:3.10

WORKDIR /app
COPY backend/ /app

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /app/instance && chmod -R 777 /app/instance

EXPOSE 5000
CMD ["python", "app.py"]
