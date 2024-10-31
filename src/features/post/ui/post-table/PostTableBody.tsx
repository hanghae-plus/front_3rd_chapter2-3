import { useMemo } from 'react'
import { filterStore } from '@features/post/model/stores'
import { usePosts } from '@features/post/model/hooks'
import { useUsers } from '@features/user/model/hooks'
import { HighlightText, Table } from '@shared/ui'
import { UserAvatar } from '@entities/user/ui'
import { PostReactions } from '@entities/post/ui'
import { Tags } from '@features/tag/ui'
import { PostActions } from './PostActions'

export const PostTableBody = () => {
  const { searchQuery } = filterStore()

  const { posts: postsData, isLoading } = usePosts()
  const { users, openUserModal } = useUsers({})

  const posts = useMemo(
    () =>
      postsData.map((post) => ({
        ...post,
        author: users.find(({ id }) => id === post.userId),
      })),
    [postsData, users],
  )

  return isLoading ? (
    <div className="flex justify-center p-4">로딩 중...</div>
  ) : (
    <Table.Body>
      {posts.map((post) => (
        <Table.Row key={post.id}>
          <Table.Cell>{post.id}</Table.Cell>
          <Table.Cell>
            <div className="space-y-1">
              <div>
                <HighlightText text={post.title} highlight={searchQuery} />
              </div>
              <Tags post={post} />
            </div>
          </Table.Cell>
          <Table.Cell>{post.author && <UserAvatar author={post.author} onClick={openUserModal} />}</Table.Cell>
          <Table.Cell>
            <PostReactions reactions={post.reactions} />
          </Table.Cell>
          <Table.Cell>
            <PostActions post={post} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  )
}
