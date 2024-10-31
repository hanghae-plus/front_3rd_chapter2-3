import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

interface URLParams {
  skip?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: string
  tag?: string
}

export const useURLParams = () => {
  const navigate = useNavigate()

  const updateURL = useCallback((params: URLParams) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== '') {
        searchParams.set(key, value.toString())
      }
    })

    navigate(`?${searchParams.toString()}`)
  }, [navigate])

  return { updateURL }
}