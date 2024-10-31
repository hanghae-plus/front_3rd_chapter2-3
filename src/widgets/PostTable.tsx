import { Table, TableBody, TableHead, TableHeader, TableRow } from "../shared/ui";
import { PostItem } from "../features/post-item/ui/PostItem";
import { useQueryPosts } from "../features/post/api/useQueryPosts";
import { useQueryUsers } from "../features/user/api/useQueryUsers";
import { usePostParams } from "../features/post/model/postParamsStore";
import { usePosts } from "../features/post/model/postStore";
import { useEffect } from "react";

export const PostTable = () => {
  const { skip, limit, sortBy, sortOrder, selectedTag, searchQuery } = usePostParams();
  const { setTotal } = usePosts();

  const { data: usersDTO } = useQueryUsers();
  const { data: posts } = useQueryPosts(usersDTO?.users || [], {
    skip,
    limit,
    sortBy,
    sortOrder,
    tag: selectedTag,
    searchQuery,
  });

  useEffect(() => {
    setTotal(posts?.length || 0);
  }, [posts, setTotal]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[150px]">작성자</TableHead>
            <TableHead className="w-[150px]">반응</TableHead>
            <TableHead className="w-[150px]">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{posts?.map((post) => <PostItem key={post.id} post={post} />)}</TableBody>
      </Table>
    </>
  );
};
