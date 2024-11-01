import { PostType } from "../model/post";

interface UpdatePostParamsType {
  selectedPost: PostType;
}

export const updatePost = async ({ selectedPost }: UpdatePostParamsType) => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      });
      const data = await response.json();
    //   setPosts(posts.map(post => (post.id === data.id ? data : post)));
    //   setShowEditDialog(false);
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };