import { postListState } from "@/entities/post/model/post-state";
import { PostItemType } from "@/entities/post/model/post-type";
import { PostAuthor } from "@/entities/post/ui/post-author";
import { PostId } from "@/entities/post/ui/post-id";
import { PostLike } from "@/entities/post/ui/post-like";
import { PostTitle } from "@/entities/post/ui/post-title";
import { PostControl } from "@/features/postControl/ui/post-control";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui";

const PostItem = ({ post }: PostItemType) => {
  return (
    <TableRow>
      <PostId post={post} />
      <PostTitle post={post} />
      <PostAuthor post={post} />
      <PostLike post={post} />
      <PostControl post={post} />
    </TableRow>
  );
};

export const PostTable = () => {
  const { postList } = postListState();
  return (
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

      <TableBody>
        {postList.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </TableBody>
    </Table>
  );
};
