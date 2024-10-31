export const userApis = {
  fetchUserList: async () => {
    const response = await fetch("/api/users?limit=0&select=username,image");
    return await response.json();
  },
};
