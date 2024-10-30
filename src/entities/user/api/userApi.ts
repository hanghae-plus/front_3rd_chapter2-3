export const fetchUser = async (id: number) => {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()

  return data
}
