import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getURLParams, updateURLParams } from "../lib/params"
import { URLParams } from "../types"
import { atom, useAtom } from "jotai"

const paramsAtom = atom<URLParams>(getURLParams(new URLSearchParams(location.search)))

export const useURLParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [params, setParams] = useAtom(paramsAtom)

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
