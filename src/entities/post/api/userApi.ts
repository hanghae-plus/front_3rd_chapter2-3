export const fetchUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  if (!response.ok) {
    throw new Error("사용자 정보 가져오기 실패")
  }
  return response.json()
}
