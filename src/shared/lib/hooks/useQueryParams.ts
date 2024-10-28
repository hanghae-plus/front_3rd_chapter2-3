import { useLocation, useNavigate } from 'react-router-dom'

export const useQueryParams = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(queryParams)
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    navigate(`?${newParams.toString()}`)
  }

  const getParam = (key: string, defaultValue: string = '') => {
    return queryParams.get(key) || defaultValue
  }

  return { queryParams, updateURL, getParam }
}
