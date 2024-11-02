export const BASE_URL = '/api'

export interface PaginationParams {
  limit?: number
  skip?: number
}

export interface SearchParams {
  q: string
}

export const api = {
  get: async <T>(endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    if (!response.ok) throw new Error('API Error')
    return response.json() as Promise<T>
  },

  post: async <T>(endpoint: string, data: unknown) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('API Error')
    return response.json() as Promise<T>
  },

  put: async <T>(endpoint: string, data: unknown) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('API Error')
    return response.json() as Promise<T>
  },

  delete: async <T>(endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('API Error')
    return response.json() as Promise<T>
  },

  patch: async <T>(endpoint: string, data: unknown) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('API Error')
    return response.json() as Promise<T>
  },
}
