import { useAtom } from "jotai"
import { useNavigate } from "react-router-dom"
import { paramsAtom } from "../../../entities/model/url/atoms"
import { updateURLParams } from "../../../shared/lib/params"
import { URLParams } from "../../../shared/types"

export const useURLActions = () => {
  const navigate = useNavigate()
  const [params, setParams] = useAtom(paramsAtom)

  const updateParams = (newParams: Partial<URLParams>) => {
    const updatedParams = { ...params, ...newParams }
    setParams(updatedParams)
    updateURLParams(updatedParams, navigate)
  }

  const updateURL = () => {
    updateURLParams(params, navigate)
  }

  return {
    updateParams,
    updateURL,
    setParams,
  }
}
