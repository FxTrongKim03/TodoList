from fastapi import FastAPI
from .db import engine, Base
from .routers import todos
from .core.cors import add_cors_middleware

# Lệnh này yêu cầu SQLAlchemy tạo các bảng
# (dựa trên models.py) trong database Postgres
# nếu chúng chưa tồn tại.
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Thêm CORS middleware [cite: 36]
add_cors_middleware(app)

# Thêm router /todos từ file todos.py
app.include_router(todos.router)

# @app.get("/", tags=["root"])
# def read_root():
#     return {"message": "Todo Backend is running! Access /docs for API details."}