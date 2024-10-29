import { PostType } from "../model/post-type";

export const fetchAddPost = async (newPost: PostType) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  const data: PostType = await response.json();

  return data;
};
