export const userApis = {
  fetchUserList: async (): Promise<ResUser> => {
    const response = await fetch("/api/users?limit=0&select=username,image");
    return await response.json();
  },
  fetchUser: async (userId: number): Promise<ResUserDetail> => {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
  },
};
