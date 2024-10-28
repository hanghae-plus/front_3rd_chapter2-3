import axios from "axios"

const BASE_URL = "/api"

export const apiCall = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
