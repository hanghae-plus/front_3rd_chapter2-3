import { useEffect } from 'react';

import { Post } from '../../../../entities';
import { usePostStore } from '../../../../entities/post/model/usePostStore';
import { usePostsQuery } from '../../../../entities/post/queries/usePostQuries';
import { Table } from '../../../../shared/ui/organisms/Table/ui/Table';
import { TableBody } from '../../../../shared/ui/organisms/Table/ui/TableBody';
import PostTableContent from './PostTableContent';
import PostTableHeader from './PostTableHeader';

const PostTable = () => {
  const { data } = usePostsQuery()
  const { posts, setPosts } = usePostStore()

  useEffect(() => {
    if (data) {
      setPosts(data.posts)
    }
  }, [data])

  return (
    <Table>
      <PostTableHeader />
      <TableBody>{posts?.map((post: Post) => <PostTableContent post={post} />)}</TableBody>
    </Table>
  )
}

export default PostTable
