// 모든 유저 데이터 가져오기
export const getAllUsersData = async () => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image");
    return response.json();
  } catch (error) {
    console.error("모든 유저 데이터 가져오기 오류:", error);
    throw error;
  }
};

// 사용자 데이터 가져오기
export const getUserData = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  } catch (error) {
    console.error("유저 데이터 가져오기 오류:", error);
    throw error;
  }
};
