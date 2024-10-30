const fetchUsers = () => `/api/users?limit=0&select=username,image`
const fetchUserById = (id: number) => `/api/users/${id}`

export { fetchUsers, fetchUserById }
