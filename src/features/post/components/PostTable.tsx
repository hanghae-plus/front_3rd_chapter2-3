import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/text"
import PostTableAction from "./PostTableAction"
import useSearchParams from "../../search/libs/useSearchParams"
import { usePosts } from "../../../entities/post/api/get-post"
import { useMemo, useState } from "react"
import { Post } from "../../../entities/post/model/types"
import PostDetailDialog from "./PostDetailDialog"
import PostModifyDialog from "./PostModifyDialog"
import { useDeletePost } from "../api/delete-post"
import { useUpdatePost } from "../api/update-post"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useUsers } from "../../../entities/user/api/get-user"
import { useTaggedPosts } from "../../../entities/post/api/get-post-with-tag"
import Loading from "../../../shared/ui/Loading"
import { useModal } from "../../../shared/lib/modal"

export interface PostTableProps {
  searchedPosts: { posts: Post[] } | undefined
  onOpenUserModal: (userId: Post["userId"]) => void
}

const PostTable = ({ searchedPosts, onOpenUserModal }: PostTableProps) => {
  const [postId, setPostId] = useState<number>(0)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const { isOpen, openModal, closeModal, manageModal } = useModal({
    DETAIL: false,
    EDIT: false,
  })

  const {
    searchParams: { search, limit, skip, tag },
    setSearchParams,
  } = useSearchParams()

  // Post
  const {
    data: { posts },
  } = usePosts({ limit: Number(limit), skip: Number(skip) })
  const { mutate: updatePost } = useUpdatePost()
  const { mutate: deletePost } = useDeletePost()

  // Post(Tagged)
  const {
    data: { posts: taggedPosts },
    isPending: isTaggedPostsPending,
  } = useTaggedPosts(tag)

  // User
  const {
    data: { users },
    isPending: isUsersPending,
  } = useUsers()

  const hadleOpenDetail = (post: Post) => {
    setSelectedPost(post)
    setPostId(post.id)
    openModal("DETAIL")
  }

  const handleOpenEdit = (post: Post) => {
    setSelectedPost(post)
    openModal("EDIT")
  }

  const handleOpenUserModal = (userId: Post["userId"]) => {
    onOpenUserModal(userId)
  }

  // 게시물 업데이트
  const handleUpdatePost = (post: Post) => {
    updatePost(
      { id: post.id, post },
      {
        onSuccess: () => {
          closeModal("EDIT")
        },
        onError: (error) => {
          console.error("게시물 업데이트 오류:", error)
        },
      },
    )
  }

  // 게시물 삭제
  const handleDeletePost = async (id: Post["id"]) => {
    deletePost(
      { id },
      {
        onError: (error) => {
          console.error("게시물 삭제 오류:", error)
        },
      },
    )
  }

  const postWithUser = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      })),
    [posts, users],
  )

  const taggedPostWithUser = useMemo(
    () =>
      taggedPosts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      })),
    [taggedPosts, users],
  )

  const targetPosts = useMemo(() => {
    return search ? (searchedPosts?.posts ?? []) : !!tag && tag !== "all" ? taggedPostWithUser : postWithUser
  }, [search, searchedPosts, postWithUser, tag, taggedPostWithUser])

  const isLoading = useMemo(() => isTaggedPostsPending || isUsersPending, [isTaggedPostsPending, isUsersPending])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
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
          {targetPosts.map((post) => {
            const { id, title, userId, author, reactions } = post

            return (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{highlightText(title, search)}</div>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((postTag) => (
                        <span
                          key={`tag_${postTag}`}
                          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                            tag === postTag.name
                              ? "text-white bg-blue-500 hover:bg-blue-600"
                              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                          }`}
                          onClick={() => {
                            setSearchParams((prev) => ({ ...prev, tag: postTag.name }))
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
                    onClick={() => handleOpenUserModal(userId)}
                  >
                    <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
                    <span>{author?.username}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{reactions?.likes || 0}</span>
                    <ThumbsDown className="w-4 h-4" />
                    <span>{reactions?.dislikes || 0}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <PostTableAction
                    onEditButton={() => handleOpenEdit(post)}
                    onCommentButton={() => hadleOpenDetail(post)}
                    onDeleteButton={() => handleDeletePost(id)}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* 게시물 수정 대화상자 */}
      {isOpen("EDIT") && (
        <PostModifyDialog post={selectedPost} onOpenChange={manageModal("EDIT")} onSubmit={handleUpdatePost} />
      )}

      {/* 게시물 상세 보기 대화상자 */}
      {isOpen("DETAIL") && (
        <PostDetailDialog
          post={selectedPost}
          postId={postId}
          searchQuery={search}
          onOpenChange={manageModal("DETAIL")}
        />
      )}
    </>
  )
}

export default PostTable
