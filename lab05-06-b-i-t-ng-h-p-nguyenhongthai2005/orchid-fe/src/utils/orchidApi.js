import axios from 'axios';

const orchidApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request Interceptor
orchidApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
orchidApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export API functions
export const getAllOrchids = async () => {
  const response = await orchidApi.get('/orchids');
  return response.data;
};

export const getOrchidById = async (id) => {
  const response = await orchidApi.get(`/orchids/${id}`);
  return response.data;
};

export const createOrchid = async (orchidData) => {
  const response = await orchidApi.post('/orchids', orchidData);
  return response.data;
};

export const updateOrchid = async (id, orchidData) => {
  const response = await orchidApi.put(`/orchids/${id}`, orchidData);
  return response.data;
};

export const deleteOrchid = async (id) => {
  const response = await orchidApi.delete(`/orchids/${id}`);
  return response.data;
};

export const loginApi = async (credentials) => {
  const response = await orchidApi.post('/auth/login', credentials);
  return response.data;
};

export const signupApi = async (userData) => {
  const response = await orchidApi.post('/auth/signup', userData);
  return response.data;
};

export default orchidApi;
