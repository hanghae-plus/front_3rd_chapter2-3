import { Card } from '@shared/ui'
import { ModalProvider, SearchBar } from '@widgets/post/ui'
import { Pagination, PostCardHeader, PostTable } from '@features/post/ui'

const PostManager = () => {
  return (
    <Card.Container className="w-full max-w-6xl mx-auto">
      <PostCardHeader />

      <Card.Content>
        <div className="flex flex-col gap-4">
          <SearchBar />

          <PostTable />

          <Pagination />
        </div>
      </Card.Content>

      <ModalProvider />
    </Card.Container>
  )
}

export default PostManager
