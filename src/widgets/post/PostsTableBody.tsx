import { usePosts } from "../../features/post/hook/usePosts";
import { Post } from "../../features/post/ui";
import { TableBody } from "../../shared/ui";

export function PostsTableBody() {
  const { posts } = usePosts();
  return (
    <TableBody>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </TableBody>
  );
}
