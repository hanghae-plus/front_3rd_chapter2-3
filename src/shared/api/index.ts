import axios from "axios"

const baseURL = "/api"

export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": `application/json`,
  },
})
