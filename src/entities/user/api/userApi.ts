import { FetchAllUserReturnType } from "./types"

export const fetchAllUser = async (): Promise<FetchAllUserReturnType> => {
  try {
    const response = await fetch("/api/users?limit=0")
    const data = await response.json()

    return data
  } catch (error) {
    console.error("사용자 가져오기 오류:", error)
    throw new Error(`사용자 가져오기 오류: ${error}`)
  }
}
