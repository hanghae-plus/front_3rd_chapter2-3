export const fetchApi = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API 오류:', error)
    throw error
  }
}
