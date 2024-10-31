import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

type ParamKey<T> = keyof T
type ParamValue = string | number

interface UseQueryParamsOptions<T> {
  defaultValues: T
}

const useQueryParams = <T extends Record<string, ParamValue>>({ defaultValues }: UseQueryParamsOptions<T>) => {
  const navigate = useNavigate()
  const location = useLocation()

  // URL 파라미터 상태 초기화
  const [params, setParams] = useState<T>(defaultValues)

  // location.search가 변경될 때마다 params 상태를 업데이트
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const updatedParams = { ...defaultValues }

    Object.keys(defaultValues).forEach((key) => {
      const value = queryParams.get(key)
      const typedKey = key as keyof T

      if (value !== null) {
        // defaultValues의 타입에 따라 값 변환
        updatedParams[typedKey] =
          typeof defaultValues[typedKey] === "number" ? (parseFloat(value) as T[keyof T]) : (value as T[keyof T])
      }
    })

    setParams(updatedParams)
  }, [location.search, defaultValues])

  // 특정 키로 URL 파라미터 설정하기
  const setParam = (key: ParamKey<T>, value?: ParamValue) => {
    const updatedParams = new URLSearchParams(location.search)

    if (value !== undefined) {
      updatedParams.set(key as string, String(value))
    } else {
      updatedParams.delete(key as string)
    }
    navigate(`?${updatedParams.toString()}`, { replace: true })
  }

  return {
    ...params,
    setParam,
  }
}

export default useQueryParams
