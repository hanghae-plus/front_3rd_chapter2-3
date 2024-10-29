import { BASE_API_URL } from '../config';

export interface ApiClientConfig {
  baseURL: string;
  headers?: HeadersInit;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export class BaseApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  private getFullPath(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    try {
      return await response.json();
    } catch (error) {
      console.error('Failed to parse response:', error);
      throw new Error('Failed to parse response');
    }
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    try {
      const url = this.getFullPath(endpoint, config.params);
      const response = await fetch(url, {
        ...config,
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET Request failed:', error);
      throw new Error('Failed to fetch data');
    }
  }

  async post<T>(endpoint: string, params?: Record<string, unknown>, config: RequestConfig = {}): Promise<T> {
    try {
      const url = this.getFullPath(endpoint, config.params);
      const response = await fetch(url, {
        ...config,
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
        body: JSON.stringify(params),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST Request failed:', error);
      throw new Error('Failed to send data');
    }
  }
  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    try {
      const url = this.getFullPath(endpoint, config.params);
      const response = await fetch(url, {
        ...config,
        method: 'DELETE',
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('DELETE Request failed:', error);
      throw new Error('Failed to delete data');
    }
  }
  async put<T>(endpoint: string, params?: Record<string, unknown>, config: RequestConfig = {}): Promise<T> {
    try {
      const url = this.getFullPath(endpoint, config.params);
      const response = await fetch(url, {
        ...config,
        method: 'PUT',
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
        body: JSON.stringify(params),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PUT Request failed:', error);
      throw new Error('Failed to update data');
    }
  }
}

export const apiClient = new BaseApiClient({ baseURL: BASE_API_URL });
console.log('BASE_API_URL: ', BASE_API_URL);
