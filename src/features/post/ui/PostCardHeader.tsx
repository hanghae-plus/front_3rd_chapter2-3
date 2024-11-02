import { Button, Card } from '@shared/ui'
import { Plus } from 'lucide-react'
import { postStore } from '@features/post/model/stores'
import { useCallback } from 'react'

export const PostCardHeader = () => {
  const { setShowAddDialog } = postStore()

  const onOpenAddDialog = useCallback(() => {
    setShowAddDialog(true)
  }, [setShowAddDialog])

  return (
    <Card.Header>
      <Card.Title className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={onOpenAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </Card.Title>
    </Card.Header>
  )
}
