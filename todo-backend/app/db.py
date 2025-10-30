from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
# Tải biến môi trường từ file .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# # =================== DÒNG DEBUG ===================
# print("="*50)
# print(f"PYTHON ĐANG KẾT NỐI VỚI: {DATABASE_URL}")
# print("="*50)
# # ================= END DEBUG =====================

# # Thêm kiểm tra
# if DATABASE_URL is None:
#     print("LỖI NGHIÊM TRỌNG: Không tìm thấy DATABASE_URL!")
#     # Dừng chương trình nếu không tìm thấy URL
#     raise ValueError("DATABASE_URL không được tìm thấy, hãy kiểm tra file .env")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency: Cung cấp 1 DB session cho mỗi request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()