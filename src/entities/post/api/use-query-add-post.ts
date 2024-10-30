import apiRequest from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import { NewPostType } from "@/features/addPost/model/type";

const fetchAddPost = async (newPost: NewPostType) => {
  const response = await apiRequest.post("/api/posts/add", newPost);
  return response.data;
};

export const useQueryAddPost = (newPost: NewPostType) => {
  const { data } = useQuery<NewPostType>({
    queryKey: ["add-post"],
    queryFn: () => fetchAddPost(newPost),
  });

  return { data };
};
