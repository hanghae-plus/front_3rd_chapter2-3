import axios, { AxiosRequestConfig } from 'axios';

const baseURL = '/api';

const apiBase = axios.create({
  baseURL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClient = {
  get: async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiBase.get<T>(url, { ...config, params });
    return response.data;
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiBase.post<T>(url, data, config);
    return response.data;
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiBase.put<T>(url, data, config);
    return response.data;
  },

  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiBase.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiBase.delete<T>(url, config);
    return response.data;
  },
};

export default apiClient;