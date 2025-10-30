from sqlalchemy import Column, Integer, String, Boolean
from .db import Base # Import Base từ file db.py

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    # Validate ≤ 140 ký tự ở mức DB [cite: 13]
    title = Column(String(140), nullable=False) 
    done = Column(Boolean, default=False)