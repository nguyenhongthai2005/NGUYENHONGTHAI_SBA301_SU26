import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',  // json-server
  timeout: 8000,                     // hủy sau 8 giây
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: tự gắn token
api.interceptors.request.use(config => {
  // Vì json-server không yêu cầu token thực tế, ta chỉ mô phỏng việc gắn token
  const currentUser = localStorage.getItem('current_user');
  if (currentUser) {
    const userObj = JSON.parse(currentUser);
    // Giả lập token
    config.headers.Authorization = `Bearer fake-token-${userObj.id}`;
  }
  return config;
});

// Response interceptor: xử lý lỗi tập trung
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
