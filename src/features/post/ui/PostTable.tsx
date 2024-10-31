import React, { useEffect, useState } from "react"

import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"

import { PostType } from "../../../entities/post/api/types"
import useTableStore from "../../table/model/useTableStore"
import { UserType } from "../../../entities/user/api/types"
import { fetchAllTags } from "../../../entities/tag/api/tagApi"

import UserDetailModal from "../../user/ui/UserDetailModal"
import TableFillter from "../../table/ui/TableFillter"

import { HighlightText } from "../../../widgets/post/ui/HighlightText"

import { Button } from "../../../shared/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select"

import EditPostDialog from "./EditPostDialog"
import PostDetailDialog from "./PostDetailDialog"
import PostLoading from "../../../widgets/post/ui/Loading"
import useQueryPosts from "../api/useQueryPost"
import useMutationDeletePost from "../api/useMutationDeletePosts"
import useQueryUsers from "../api/useQueryUsers"

export const PostTable: React.FC = () => {
  const postsQuery = useQueryPosts()
  const usersQuery = useQueryUsers()

  const { mutate } = useMutationDeletePost()

  const { searchQuery, selectedTag, setSelectedTag, limit, setLimit } = useTableStore()

  const [isShowUserModal, setIsShowUserModal] = useState(false)
  const [isShowPostDetailDialog, setIsShowPostDetailDialog] = useState(false)
  const [isShowEditPostDialog, setIsShowEditPostDialog] = useState(false)

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null)

  const onClickUser = (user: UserType | null) => {
    setSelectedUser(user)
    setIsShowUserModal(true)
  }

  const onClickPostDetailBtn = (post: PostType) => {
    setSelectedPost(post)
    setIsShowPostDetailDialog(true)
  }

  const onClickEditPostBtn = (post: PostType) => {
    setSelectedPost(post)
    setIsShowEditPostDialog(true)
  }

  const onClickDeleteBtn = (postId: PostType["id"]) => {
    mutate(postId)
  }

  useEffect(() => {
    fetchAllTags()
  }, [])

  if (postsQuery.isLoading) return <PostLoading />

  if (postsQuery.error) return <div>{postsQuery.error.message}</div>

  return (
    <div className="flex flex-col gap-4">
      <TableFillter />
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
          {postsQuery.data?.posts &&
            postsQuery.data.posts.map((post) => {
              const user = usersQuery.data?.users.find((user) => user.id === post.userId)

              return (
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
                              setSelectedTag(tag)
                              // updateURL()
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
                      onClick={() => onClickUser(user || null)}
                    >
                      <img src={user?.image} alt={user?.username} className="w-8 h-8 rounded-full" />
                      <span>{user?.username}</span>
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
                      <Button variant="ghost" size="sm" onClick={() => onClickPostDetailBtn(post)}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onClickEditPostBtn(post)
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onClickDeleteBtn(post.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>표시</span>
          <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
          <span>항목</span>
        </div>
        <div className="flex gap-2">
          <Button>이전</Button>
          <Button>다음</Button>
          {/* <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
            이전
          </Button>
          <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
            다음
          </Button> */}
        </div>
      </div>
      <UserDetailModal
        isOpen={isShowUserModal}
        setOpen={(value: boolean) => setIsShowUserModal(value)}
        user={selectedUser as UserType}
      />
      <PostDetailDialog
        isOpen={isShowPostDetailDialog}
        setOpen={(value) => setIsShowPostDetailDialog(value)}
        post={selectedPost}
      />
      <EditPostDialog
        isOpen={isShowEditPostDialog}
        setOpen={(value) => setIsShowEditPostDialog(value)}
        post={selectedPost}
      />
    </div>
  )
}
