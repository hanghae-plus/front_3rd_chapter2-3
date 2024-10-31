import axiosClient from "../../../app/axios/axiosClient.ts"

export const getTagListApi = async () => {
  const response = await axiosClient.get("/posts/tags")
  return response.data
}
