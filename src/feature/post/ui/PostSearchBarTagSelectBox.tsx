import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui";
import { useGetPostByTag, useGetTags, usePost, useQueryParams } from "../model";
import { Post } from "../../../entities/post/model/types.ts";
import { User } from "../../../entities/user/model/types.ts";

export const PostSearchBarTagSelectBox = () => {
  const { selectedTag, tags, setSelectedTag, setPosts, setTotal, setTags } = usePost();
  const { setQueryParams } = useQueryParams();

  const { data: tagsData } = useGetTags();
  const { data: postByTagData } = useGetPostByTag(selectedTag || "all");

  useEffect(() => {
    if (tagsData) {
      setTags(tagsData);
    }
  }, [tagsData, setTags]);

  useEffect(() => {
    if (postByTagData) {
      const postsWithUsers = postByTagData.postsData.posts.map((post: Post) => ({
        ...post,
        author: postByTagData.usersData.users.find((user: User) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postByTagData.postsData.total);
    }
  }, [postByTagData, setPosts, setTotal]);

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    setQueryParams({ selectedTag: tag });
  };

  return (
    <Select value={selectedTag} onValueChange={(tag: string) => handleSelectTag(tag)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags &&
          tags?.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
