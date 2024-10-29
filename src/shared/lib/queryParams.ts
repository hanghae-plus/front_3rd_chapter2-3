import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"

type QueryParams = Record<string, string | number>
type StringifiedQueryParams<T> = {
  [P in keyof T]: string
}

export const getQueryParameters = <T extends QueryParams>(initialValue?: T) => {
  const queryParams = new URLSearchParams(location.search)
  const params: QueryParams = initialValue ?? {}

  queryParams.forEach((value, key) => {
    params[key] = value
  })

  return params as StringifiedQueryParams<T>
}

export const useUpdateQueryParameter = <T extends QueryParams>() => {
  const location = useLocation()
  const navigate = useNavigate()

  const updateStatus = useCallback(
    (params: Partial<T>) => {
      const searchParams = new URLSearchParams(location.search)

      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, String(value))
      })

      navigate(`?${searchParams.toString()}`)
    },
    [location.search, navigate],
  )

  return updateStatus
}
