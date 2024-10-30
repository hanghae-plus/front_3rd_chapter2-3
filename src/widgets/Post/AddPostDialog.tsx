import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../shared/ui"
import { addPost } from "../../entities/Post/api"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import { NewPostType, PostType } from "../../entities/Post/model/types"
import usePost from "../../features/post/model/usePost"

interface AddPostDialogProps {
  setPostList: React.Dispatch<React.SetStateAction<PostType[]>>
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({ setPostList }) => {
  const { newPost, setNewPost } = usePost()

  const { showAddDialog, setShowAddDialog } = usePostDialog()

  // const handleAddPost = async (newPost: NewPostType) => {
  //   const res = await addPost(newPost)
  //   addPost(res)
  //   setPostList((prev) => [...prev, res])
  //   setShowAddDialog(false)
  //   setNewPost({ title: "", body: "", userId: 1 })
  // }

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()

      console.log(data)
      setPostList((prev) => {
        console.log([...prev, data])

        return [...prev, data]
      })
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" name="title" value={newPost.title} onChange={handleNewPostChange} />
          <Textarea rows={30} placeholder="내용" name="body" value={newPost.body} onChange={handleNewPostChange} />
          <Input
            type="number"
            placeholder="사용자 ID"
            name="userId"
            value={newPost.userId}
            onChange={handleNewPostChange}
          />
          <Button onClick={() => addPost()}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostDialog
