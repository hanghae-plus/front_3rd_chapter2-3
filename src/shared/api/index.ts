import axios, { AxiosRequestConfig } from 'axios';

const baseURL = '/api';

const apiBase = axios.create({
  baseURL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClient = {
  get: <T>(url: string, params?: any, config?: AxiosRequestConfig) =>
    apiBase.get<T>(url, { ...config, params }).then((r) => r.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiBase.post<T>(url, data, config).then((r) => r.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiBase.put<T>(url, data, config).then((r) => r.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiBase.put<T>(url, data, config).then((r) => r.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) => apiBase.delete<T>(url, config).then((r) => r.data),
};

export default apiClient;