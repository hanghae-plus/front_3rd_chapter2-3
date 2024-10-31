import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getURLParams, updateURLParams } from "../lib/params"
import { URLParams } from "../types"

export const useURLParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const initialParams = getURLParams(new URLSearchParams(location.search))

  const [params, setParams] = useState(initialParams)

  const updateParams = (newParams: Partial<URLParams>) => {
    const updatedParams = { ...params, ...newParams }
    setParams(updatedParams)
    updateURLParams(updatedParams, navigate)
  }

  const updateURL = () => {
    updateURLParams(params, navigate)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setParams(getURLParams(searchParams))
  }, [location.search])

  return { params, updateParams, updateURL }
}
