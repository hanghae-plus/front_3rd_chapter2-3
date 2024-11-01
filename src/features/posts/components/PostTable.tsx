import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Author, Post } from "../../../entities/posts/model/Post"
import { Users } from "../../../entities/users/model/User"
import { Button } from "../../../shared/ui"
import HighlightText from "../../../shared/ui/HighlightText"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/Table"
import { useFetchComments } from "../../comments/api/commentsFeaturesApi"
import useComment from "../../comments/hooks/useComments"
import { useFetchUserModalInfo } from "../../users/api/userFeaturesApi"
import useUser from "../../users/hooks/useUser"
import { useDeletePost } from "../api/postFeatureApi"
import usePost from "../hooks/usePost"

const PostTable = () => {
  const {
    posts,
    searchQuery,
    selectedTag,
    setSelectedTag,
    setSelectedPost,
    setShowEditDialog,
    setShowPostDetailDialog,
    setPosts,
  } = usePost()

  const { setShowUserModal, setSelectedUser } = useUser()

  const { setComments } = useComment()
  const [postAuthor, setPostAuthor] = useState<Author>({ id: 0, image: "", username: "", fullName: "" })
  const [postDetail, setPostDetail] = useState<Post>({
    body: "",
    id: 0,
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    tags: [],
    title: "",
    userId: 0,
    views: 0,
  })

  const openUserModal = async (user: Users) => {
    setPostAuthor(user)
  }

  const { data: userModalInfo, error: modalError, isLoading: isModalLoading } = useFetchUserModalInfo(postAuthor)

  useEffect(() => {
    if (userModalInfo && !isModalLoading && !modalError) {
      setSelectedUser(userModalInfo)
      setShowUserModal(true)
    }
  }, [userModalInfo, isModalLoading, modalError])

  const { data: comments, error: postDeatilError, isLoading: isPostDetailLoading } = useFetchComments(postDetail.id)
  useEffect(() => {
    if (comments && !isPostDetailLoading && !postDeatilError) {
      setShowPostDetailDialog(true)
      if (postDetail) {
        setSelectedPost(postDetail)
        setComments((prev) => ({ ...prev, [postDetail.id]: comments.comments }))
      }
    }
  }, [comments, isPostDetailLoading, postDeatilError, postDetail])

  function openPostDetail(post: Post) {
    setPostDetail(post)
  }

  function handleSelectedTag(tag: string) {
    setSelectedTag(tag)
  }
  function handleShowEditDialog(post: Post) {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const { mutate: deletePost } = useDeletePost()
  function handleDeletePost(id: number) {
    deletePost(id, {
      onSuccess: () => {
        setPosts({
          ...posts,
          posts: posts.posts.filter((post) => post.id !== id),
        })
      },
      onError: (error) => {
        console.error("Failed to like comment:", error)
      },
    })
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts?.posts?.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>
                  <HighlightText text={post.title} highlight={searchQuery} />
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        handleSelectedTag(tag)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post?.author && openUserModal(post.author)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleShowEditDialog(post)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable
