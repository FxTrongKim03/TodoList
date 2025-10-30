from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas # Dùng .. để import từ thư mục cha
from ..db import get_db

router = APIRouter(
    prefix="/todos", # Thêm /todos vào trước tất cả các endpoint
    tags=["todos"]    # Nhóm các API này lại trong /docs
)

# GET /todos [cite: 12]
@router.get("/", response_model=List[schemas.Todo])
def get_all_todos(db: Session = Depends(get_db)):
    todos = db.query(models.Todo).all()
    return todos

# POST /todos [cite: 13]
@router.post("/", response_model=schemas.Todo, status_code=status.HTTP_201_CREATED)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    # schema TodoCreate đã tự động validate (không rỗng, <= 140)
    # Nếu fail, FastAPI tự trả về lỗi 422 [cite: 17]
    new_todo = models.Todo(title=todo.title)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

# Hàm helper để tìm todo (tránh lặp code)
def get_todo_by_id(id: int, db: Session):
    db_todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    if db_todo is None:
        # Lỗi 404 nếu không tồn tại [cite: 17]
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

# PATCH /todos/{id} [cite: 14]
@router.patch("/{id}", response_model=schemas.Todo)
def update_todo(id: int, todo_update: schemas.TodoUpdate, db: Session = Depends(get_db)):
    db_todo = get_todo_by_id(id, db)
    
    # Lấy data đã gửi, chỉ lấy các trường được set (không null)
    update_data = todo_update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_todo, key, value)
    
    db.commit()
    db.refresh(db_todo)
    return db_todo

# DELETE /todos/{id} [cite: 15]
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(id: int, db: Session = Depends(get_db)):
    db_todo = get_todo_by_id(id, db)
    db.delete(db_todo)
    db.commit()
    return None # Trả về 204 No Content