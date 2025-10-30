import type { Todo } from '../api/types';
import { useUpdateTodo, useDeleteTodo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleToggle = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      data: { done: !todo.done },
    });
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    // Thẻ <li> này sẽ được CSS style thành "Card"
    <li className={todo.done ? 'done' : ''}>
      
      {/* Nhóm nội dung chính của Card */}
      <div className="card-content">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={handleToggle}
          disabled={updateTodoMutation.isPending}
          aria-label={todo.title}
        />
        <span>{todo.title}</span>
      </div>
      
      {/* Nhóm các nút bấm (nếu có) */}
      <div className="card-actions">
        <button
          onClick={handleDelete}
          disabled={deleteTodoMutation.isPending}
        >
          Delete
        </button>
      </div>
      
      {/* Sau này bạn có thể thêm các thông tin 
        như avatar, ngày tháng... vào đây 
      */}
    </li>
  );
}