import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// 1. Import QueryClient và QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

// Tạo một Query Client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Thiết lập cơ bản: không tự động gọi lại (refetch) khi cửa sổ lấy focus
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. Bọc ứng dụng bằng QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);