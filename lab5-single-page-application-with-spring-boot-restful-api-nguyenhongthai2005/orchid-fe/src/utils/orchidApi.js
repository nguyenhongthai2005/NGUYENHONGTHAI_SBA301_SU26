import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllOrchids = async () => {
  const response = await api.get('/orchids/');
  return response.data.data ? response.data.data : response.data;
};

export const getOrchidById = async (id) => {
  const response = await api.get(`/orchids/${id}`);
  return response.data.data ? response.data.data : response.data;
};

export const createOrchid = async (orchidData) => {
  const response = await api.post('/orchids/', orchidData);
  return response.data.data ? response.data.data : response.data;
};

export const updateOrchid = async (id, orchidData) => {
  const response = await api.put(`/orchids/${id}`, orchidData);
  return response.data.data ? response.data.data : response.data;
};

export const deleteOrchid = async (id) => {
  const response = await api.delete(`/orchids/${id}`);
  return response.data.data ? response.data.data : response.data;
};
