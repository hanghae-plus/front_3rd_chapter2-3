import { useState } from "react";

import { PostWithAuthorType } from "@/entities/post/model/post-type";
import { useMutationUpdatepost } from "@/entities/post/api/use-mutation-update-post";
import { postListState } from "@/entities/post/model/post-state";

export const useUpdatePost = (post: PostWithAuthorType) => {
  const [newPost, setNewPost] = useState<PostWithAuthorType>(post);
  const mutation = useMutationUpdatepost(newPost);
  const { updatePost } = postListState();

  function handleChangeNewPost<K extends keyof PostWithAuthorType>(
    key: K,
    value: PostWithAuthorType[K],
  ) {
    setNewPost(prev => ({ ...prev, [key]: value }));
  }

  async function handleUpdatePost(close: () => void) {
    const newPostData = await mutation.mutateAsync();
    updatePost(newPostData);
    close();
  }

  return { newPost, handleChangeNewPost, handleUpdatePost };
};
