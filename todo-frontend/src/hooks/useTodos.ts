import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';
import type { Todo, TodoCreate, TodoUpdate } from '../api/types';

// Key dùng để định danh dữ liệu Todos trong cache
const TODOS_QUERY_KEY = 'todos';

// 1. Hook để LẤY danh sách Todos
export function useFetchTodos() {
  return useQuery<Todo[]>({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: getTodos,
    // Nếu API fail, nó sẽ không cố gắng thử lại vô tận
    retry: 2, 
  });
}

// 2. Hook để TẠO Todo (Add)
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: TodoCreate) => createTodo(newTodo),
    // Sau khi tạo thành công, tự động làm sạch cache và gọi lại API GET /todos
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
}

// 3. Hook để CẬP NHẬT Todo (Toggle/Update)
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TodoUpdate }) => updateTodo(id, data),
    
    // BẮT BUỘC: Xử lý Optimistic Update và Rollback (theo Guideline)
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<Todo[]>([TODOS_QUERY_KEY]);

      // Optimistic Update: Cập nhật UI ngay lập tức
      queryClient.setQueryData<Todo[]>([TODOS_QUERY_KEY], (old) => 
        old ? old.map(todo => (todo.id === id ? { ...todo, ...data } : todo)) : []
      );

      return { previousTodos }; // Trả về data cũ để rollback nếu fail
    },
    
    // Nếu API fail, Rollback về trạng thái cũ
    onError: (err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData([TODOS_QUERY_KEY], context.previousTodos);
      }
      alert(`Update failed: ${err.message}`); // Hiển thị lỗi friendly
    },
    
    // Luôn gọi lại sau khi hoàn thành (thành công hoặc lỗi)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
}

// 4. Hook để XÓA Todo (Delete)
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    
    // Xử lý Optimistic Delete
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<Todo[]>([TODOS_QUERY_KEY]);

      // Optimistic Delete: Xóa item khỏi UI ngay lập tức
      queryClient.setQueryData<Todo[]>([TODOS_QUERY_KEY], (old) => 
        old ? old.filter(todo => todo.id !== id) : []
      );
      return { previousTodos };
    },
    
    // Rollback nếu fail
    onError: (err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData([TODOS_QUERY_KEY], context.previousTodos);
      }
      alert(`Delete failed: ${err.message}`);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
}