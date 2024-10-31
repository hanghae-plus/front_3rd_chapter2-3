import { Table } from '@shared/ui'
import { usePosts, useUrlSync } from '@features/post/model/hooks'
import { PostTableHeader } from '@entities/post/ui'
import { PostTableBody } from './PostTableBody'

export const PostTable = () => {
  useUrlSync()

  const { isLoading } = usePosts()

  return isLoading ? (
    <div className="flex justify-center p-4">로딩 중...</div>
  ) : (
    <Table.Container>
      <PostTableHeader />
      <PostTableBody />
    </Table.Container>
  )
}
