import { atom, useAtom } from "jotai"
import { NewPostType, PostType } from "../../../entities/Post/model/types"

const newPostAtom = atom<NewPostType>({ title: "", body: "", userId: 1 })
const selectedPostAtom = atom<PostType | undefined>(undefined)

const usePost = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  return { newPost, setNewPost, selectedPost, setSelectedPost }
}

export default usePost
