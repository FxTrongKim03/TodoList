// Dựa trên Guideline và file useTodos.ts của bạn

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// Kiểu dữ liệu dùng khi TẠO mới (POST /todos) [cite: 13]
export type TodoCreate = {
  title: string;
};

// Kiểu dữ liệu dùng khi CẬP NHẬT (PATCH /todos/{id}) [cite: 14]
export type TodoUpdate = {
  title?: string;
  done?: boolean;
};