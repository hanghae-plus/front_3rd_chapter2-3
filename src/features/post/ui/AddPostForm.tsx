import { Button, Input, Textarea } from '@shared/ui'
import { postStore } from '../model/stores'
import { usePosts } from '../model/hooks'
import { useCallback } from 'react'
import { Post } from '@entities/comment/model/types'

export default function AddPostForm() {
  const { newPost, setNewPost, setShowAddDialog } = postStore()

  const { addPost } = usePosts()

  const onSubmit = useCallback(() => {
    addPost(newPost)
    setShowAddDialog(false)
    setNewPost({ title: '', body: '', userId: 1 })
  }, [addPost, newPost, setShowAddDialog])

  const onInputChange = useCallback(
    (field: keyof Post) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === 'userId' ? Number(e.target.value) : e.target.value
      setNewPost({ ...newPost, [field]: value })
    },
    [newPost, setNewPost],
  )

  return (
    <>
      <Input placeholder="제목" value={newPost.title} onChange={onInputChange('title')} />
      <Textarea rows={30} placeholder="내용" value={newPost.body} onChange={onInputChange('body')} />
      <Input type="number" placeholder="사용자 ID" value={newPost.userId} onChange={onInputChange('userId')} />
      <Button onClick={onSubmit}>게시물 추가</Button>
    </>
  )
}
