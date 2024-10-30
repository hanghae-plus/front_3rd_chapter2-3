import { User } from "./atom"

export const userFetch = async (user: User) => {
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
