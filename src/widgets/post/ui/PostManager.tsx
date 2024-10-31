import { Card } from '@shared/ui'
import { ModalProvider, PostCardContent } from '@widgets/post/ui'
import { PostCardHeader } from '@features/post/ui'

const PostManager = () => {
  return (
    <Card.Container className="w-full max-w-6xl mx-auto">
      <PostCardHeader />

      <Card.Content>
        <PostCardContent />
      </Card.Content>

      <ModalProvider />
    </Card.Container>
  )
}

export default PostManager
