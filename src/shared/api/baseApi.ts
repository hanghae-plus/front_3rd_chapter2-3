export const baseApi = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint)
    if (!response.ok) throw new Error("GET API Error")
    return response.json()
  },

  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("POST API Error")
    return response.json()
  },

  put: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("PUT API Error")
    return response.json()
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("DELETE API Error")
    return response.json()
  },
}
