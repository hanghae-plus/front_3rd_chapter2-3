export const fetchUsersApi = async () => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return data
  } catch (error) {
    console.log(`사용자 가져오기 오류: ${error}`)
    throw new Error(`사용자 가져오기 오류: ${error}`)
  }
}
