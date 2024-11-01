interface DeletePostParamsType {
  postId: number;
}

export const deletePost = async ({ postId }: DeletePostParamsType) => {
  try {
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    // setPosts(posts.filter(post => post.id !== postId));
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
  }
};
