import { usePosts } from '@features/post/model/hooks'
import { postStore } from '@features/post/model/stores'
import { Button, Input, Textarea } from '@shared/ui'
import { useCallback } from 'react'

export const UpdatePostForm = () => {
  const { selectedPost, setSelectedPost, setShowEditDialog } = postStore()
  const { updatePost } = usePosts()

  const handleUpdatePost = useCallback(() => {
    if (!selectedPost) return
    updatePost(selectedPost)
    setShowEditDialog(false)
  }, [selectedPost, updatePost, setShowEditDialog])

  return (
    <>
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
    </>
  )
}
