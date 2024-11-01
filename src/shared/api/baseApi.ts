import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export interface ApiRequestConfig extends AxiosRequestConfig {
  isAuthRequired?: boolean
}

export class BaseApi {
  client: AxiosInstance

  constructor(endPoint: string) {
    this.client = axios.create({
      baseURL: `https://dummyjson.com/${endPoint}`,
    })
  }

  addAuthHeader(config: ApiRequestConfig = {}) {
    return {
      ...config,
      headers: {
        ...(config.headers || {}),
      },
    }
  }

  async get<T>(url: string, config?: ApiRequestConfig) {
    const result = await this.client.get<T>(url, this.addAuthHeader(config))
    return result.data
  }

  async put<T>(url: string, data?: any, config?: ApiRequestConfig) {
    const result = await this.client.put<T>(url, data, this.addAuthHeader(config))
    return result.data
  }

  async post<T>(url: string, data?: any, config?: ApiRequestConfig) {
    const result = await this.client.post<T>(url, data, this.addAuthHeader(config))
    return result.data
  }

  async delete<T>(url: string, config?: ApiRequestConfig) {
    const result = await this.client.delete<T>(url, this.addAuthHeader(config))
    return result.data
  }
}
