export const userFetchData = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`)
    const userData = await response.json()

    return userData
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
}

export const userFetchDetail = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  if (!response.ok) {
    throw new Error("사용자 데이터를 가져오는 데 실패했습니다.")
  }
  return response.json()
}
