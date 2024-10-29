export class BaseApi {
  protected baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  protected async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`)
    if (!response.ok) {
      throw new Error("data fetch 실패!!")
    }
    return response.json()
  }

  protected async post<T>(path: string, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("data post 실패!!")
    }
    return response.json()
  }

  protected async put<T>(path: string, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("data put 실패!!")
    }
    return response.json()
  }

  protected async delete(path: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("data delete 실패!!")
    }
  }
}
