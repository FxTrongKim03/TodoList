from pydantic import BaseModel, constr

# Dùng cho input khi TẠO todo
class TodoCreate(BaseModel):
    # Validation: không rỗng, ≤ 140 ký tự [cite: 13]
    title: constr(min_length=1, max_length=140)

# Dùng cho input khi CẬP NHẬT todo [cite: 14]
class TodoUpdate(BaseModel):
    title: constr(min_length=1, max_length=140) | None = None
    done: bool | None = None

# Dùng cho output khi TRẢ VỀ todo
class Todo(BaseModel):
    id: int
    title: str
    done: bool

    class Config:
        # Cho phép Pydantic đọc data từ model SQLAlchemy
        from_attributes = True