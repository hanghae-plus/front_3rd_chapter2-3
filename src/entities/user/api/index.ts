export const fetchUsersApi = async () => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`사용자 가져오기 오류: ${error}`);
    throw new Error(`사용자 가져오기 오류: ${error}`);
  }
};

export const fetchUserApi = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    throw new Error(`사용자 정보 가져오기 오류: ${error}`);
  }
};
