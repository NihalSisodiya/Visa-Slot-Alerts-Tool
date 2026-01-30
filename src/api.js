import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getAlerts = (params) => axios.get(`${API_BASE_URL}/alerts`, { params });
export const createAlert = (data) => axios.post(`${API_BASE_URL}/alerts`, data);
export const updateAlert = (id, data) => axios.put(`${API_BASE_URL}/alerts/${id}`, data);
export const deleteAlert = (id) => axios.delete(`${API_BASE_URL}/alerts/${id}`);