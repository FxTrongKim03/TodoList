import { useFetchTodos } from '../hooks/useTodos';
import { TodoInput } from '../components/TodoInput';
import { TodoItem } from '../components/TodoItem';
import '../App.css'; // Import CSS

export function Home() {
  const { data: todos = [], isLoading, isError } = useFetchTodos();

  // Lọc todos dựa trên trạng thái 'done' từ backend
  const pendingTodos = todos.filter(todo => !todo.done);
  const doneTodos = todos.filter(todo => todo.done);

  return (
    <div className="kanban-app">
      
      {/* 1. Thanh điều hướng trên cùng */}
      <nav className="top-nav">
        <div className="nav-logo">
          <span>T</span> TASK
        </div>
        <div className="nav-search">
          <input type="text" placeholder="Search everything..." />
        </div>
        <div className="nav-links">
          <a>Projects</a>
          <a>Settings</a>
          <a>Help</a>
        </div>
        <div className="nav-user">
          {/* (User avatar) */}
        </div>
      </nav>

      {/* 2. Tiêu đề của bảng */}
      <header className="board-header">
        <h1>Todo List</h1>
      </header>

      {/* 3. Bảng Kanban (ĐÃ LOẠI BỎ 2 CỘT) */}
      <main className="kanban-board">
        
        {/* CỘT 1: TASK READY */}
        <div className="kanban-column">
          <div className="column-header">
            <h3>Task Ready</h3>
            <span>{pendingTodos.length}</span>
          </div>
          {/* Form thêm mới */}
          <TodoInput />
          {/* Danh sách các task chưa xong */}
          {isLoading && <div className="loading">Loading...</div>}
          {isError && <div className="error">Error loading tasks.</div>}
          <ul className="todo-list">
            {pendingTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>

        {/* CỘT 2: DONE */}
        <div className="kanban-column">
          <div className="column-header">
            <h3>Done</h3>
            <span>{doneTodos.length}</span>
          </div>
          <ul className="todo-list">
            {doneTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
        
      </main>
    </div>
  );
}