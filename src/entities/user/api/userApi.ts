import axiosClient from "../../../app/axios/axiosClient.ts"
import { UserInfoResponse } from "../model/types.ts"

export const getUserInfo = async (id?: number): Promise<UserInfoResponse> => {
  const response = await axiosClient.get(`users/${id}`)
  return response.data
}
