export const fetchUsersFetch = async () => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const fetchUserFetch = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`)
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}
