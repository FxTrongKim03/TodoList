import type { Todo, TodoCreate, TodoUpdate } from './types';

// 1. Đọc Base URL từ file .env [cite: 56]
const API_URL = import.meta.env.VITE_API_URL;

// Hàm helper để xử lý chung các phản hồi API
async function handleApiResponse(response: Response) {
  if (!response.ok) {
    // Xử lý lỗi chuẩn (400, 404, 422, 500) [cite: 17, 64, 65]
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.detail || `Error ${response.status}`;
    throw new Error(message);
  }
  // Nếu là DELETE (204) thì không cần parse JSON [cite: 15]
  if (response.status === 204) return;
  return response.json();
}

// 2. GET /todos [cite: 12]
export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);
  return handleApiResponse(response);
};

// 3. POST /todos [cite: 13]
export const createTodo = async (data: TodoCreate): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
};

// 4. PATCH /todos/{id} [cite: 14]
export const updateTodo = async (id: number, data: TodoUpdate): Promise<Todo> => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
};

// 5. DELETE /todos/{id} [cite: 15]
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  return handleApiResponse(response);
};