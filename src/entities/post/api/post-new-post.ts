import { PostType } from "../model/post";

interface PostNewPostParamsType {
  newPost: PostType;
}

export const postNewPost = async ({ newPost }: PostNewPostParamsType) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const data: any = await response.json();
    // setPosts([data, ...posts]);
    // setShowAddDialog(false);
    // setNewPost({ title: "", body: "", userId: 1 });
    console.log(data);
    return data;
  } catch (error) {
    console.error("게시물 추가 오류:", error);
    throw error;
  }
};
