FROM leanprover/lean4:latest

RUN apt-get update && apt-get install -y python3 python3-pip && \
    pip3 install fastapi uvicorn websockets --break-system-packages

WORKDIR /app
COPY server.py /app/server.py

EXPOSE 8000
CMD ["python3", "/app/server.py"]
