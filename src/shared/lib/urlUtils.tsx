export const createQueryString = (params: Record<string, string>) => {
  const urlParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) urlParams.set(key, value)
  })
  return `${urlParams.toString()}`
}
