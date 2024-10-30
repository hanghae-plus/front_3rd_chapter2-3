import { User } from "./atom"

export const userFetchData = async (user: User) => {
  console.log("user", user)

  try {
    const response = await fetch(`/api/users/${user}`)
    const userData = await response.json()

    console.log("userData", userData)

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
