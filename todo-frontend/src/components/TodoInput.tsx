import { useState } from 'react';
import { useCreateTodo } from '../hooks/useTodos';

export function TodoInput() {
  const [title, setTitle] = useState('');
  const createTodoMutation = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    // Validate (Theo Guideline) [cite: 13]
    if (!trimmedTitle) {
      alert("Tiêu đề không được rỗng");
      return;
    }
    if (trimmedTitle.length > 140) {
      alert("Tiêu đề không được quá 140 ký tự");
      return;
    }

    createTodoMutation.mutate({ title: trimmedTitle });
    setTitle(''); 
  };

  return (
    // Style mới sẽ được áp dụng từ App.css
    <form onSubmit={handleSubmit} className="todo-form create-card-form">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What is the task?" // Placeholder mới
      />
      <button type="submit" disabled={createTodoMutation.isPending}>
        {createTodoMutation.isPending ? 'Saving...' : 'Done'}
      </button>
    </form>
  );
}