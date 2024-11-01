interface GetCommentListParamsType {
  postId: number;
}

export const getCommentList = async ({ postId }: GetCommentListParamsType) => {
  //   if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  try {
    const response = await fetch(`/api/comments/post/${postId}`);
    const data: any = await response.json();
    // setComments((prev: any) => ({ ...prev, [postId]: data.comments }));
    return data;
  } catch (error) {
    console.error("댓글 가져오기 오류:", error);
    throw error;
  }
};
