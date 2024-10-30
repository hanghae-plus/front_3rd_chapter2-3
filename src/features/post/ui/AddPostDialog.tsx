import { Button, Input, Textarea } from '@shared/ui'
import { DialogLayout } from '@widgets/ui'
import { filterStore, postStore } from '../model/stores'
import { usePosts } from '../model/hooks'

export const AddPostDialog = () => {
  const { limit, skip, searchQuery, selectedTag } = filterStore()
  const { newPost, showAddDialog, setNewPost, setShowAddDialog } = postStore()

  const { addPost } = usePosts({
    limit,
    skip,
    tag: selectedTag,
    searchQuery,
  })

  const handleAddPost = async () => {
    await addPost(newPost)
    setShowAddDialog(false)
    setNewPost({ title: '', body: '', userId: 1 })
  }
  return (
    <DialogLayout title="새 게시물 추가" open={showAddDialog} onOpenChange={setShowAddDialog}>
      <Input
        placeholder="제목"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <Textarea
        rows={30}
        placeholder="내용"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={newPost.userId}
        onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
      />
      <Button onClick={handleAddPost}>게시물 추가</Button>
    </DialogLayout>
  )
}
