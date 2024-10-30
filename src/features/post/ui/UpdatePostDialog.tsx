import { Button, Input, Textarea } from '@shared/ui'
import { DialogLayout } from '@widgets/ui'
import { filterStore, postStore } from '../model/stores'
import { usePosts } from '../model/hooks'

export const UpdatePostDialog = () => {
  const { limit, skip, searchQuery, selectedTag } = filterStore()
  const { selectedPost, showEditDialog, setSelectedPost, setShowEditDialog } = postStore()

  const { updatePost } = usePosts({
    limit,
    skip,
    tag: selectedTag,
    searchQuery,
  })

  const handleUpdatePost = async () => {
    if (!selectedPost) return
    await updatePost(selectedPost)
    setShowEditDialog(false)
  }

  return (
    <DialogLayout title="게시물 수정" open={showEditDialog} onOpenChange={setShowEditDialog}>
      <Input
        placeholder="제목"
        value={selectedPost?.title || ''}
        onChange={(e) => {
          if (!selectedPost) return
          setSelectedPost({ ...selectedPost, title: e.target.value })
        }}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={selectedPost?.body || ''}
        onChange={(e) => {
          if (!selectedPost) return
          setSelectedPost({ ...selectedPost, body: e.target.value })
        }}
      />
      <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
    </DialogLayout>
  )
}
