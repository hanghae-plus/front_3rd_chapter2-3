import { User } from "@/widgets/user/api/types";
import { useEffect, useState } from "react";
import { Post, PostsResponse } from "../model/types";

type UseFetchPostsProps = {
  limit: number;
  skip: number;
};

export const useFetchPosts = ({ limit, skip }: UseFetchPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 게시물 가져오기
    const fetchPosts = () => {
      setLoading(true);
      let postsData: PostsResponse;
      let usersData: Pick<User, "id" | "username" | "image">[];

      fetch(`/api/posts?limit=${limit}&skip=${skip}`)
        .then((response) => response.json())
        .then((data) => {
          postsData = data;

          return fetch("/api/users?limit=0&select=username,image");
        })
        .then((response) => response.json())
        .then((users) => {
          usersData = users.users;
          const postsWithUsers = postsData.posts.map((post) => ({
            ...post,
            author: usersData.find((user) => user.id === post.userId),
          }));

          setPosts(postsWithUsers);
          setTotal(postsData.total);
        })
        .catch((error) => {
          console.error("게시물 가져오기 오류:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchPosts();
  }, [limit, skip]);

  return { posts, loading, total };
};
