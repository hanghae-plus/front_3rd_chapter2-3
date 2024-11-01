import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { highlightText } from "@/shared/lib"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { attachUsersToPosts, useFetchPosts, useQueryParam } from "@/features/post"
import { useTagStore } from "@/features/tag"
import { useFetchUsers } from "@/features/user"
import { PostDeleteButton } from "@/features/post/ui/PostDeleteButton"
import { PostEditButton } from "@/features/post/ui/PostEditButton"
import { PostAddButton } from "@/features/post/ui/PostAddButton"
import { PostUserCell } from "@/features/post/ui/PostUserCell"

export const PostTable = () => {
  const params = useQueryParam()
  const tagStore = useTagStore()

  const { isLoading, data: postResponse } = useFetchPosts(params.limit, params.skip)
  const { posts } = postResponse ?? { posts: [] }
  const { data: usersResponse } = useFetchUsers("?limit=0&select=username,image")
  const { users } = usersResponse ?? { users: [] }

  const postsWithUsers = attachUsersToPosts(posts, users)

  const handleClickTag = (tag: string) => {
    tagStore.setSelectedTag(tag)
    params.updateSelectedTag(tag)
  }

  if (isLoading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
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
        {postsWithUsers.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, params.searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        tagStore.selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        handleClickTag(tag)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <PostUserCell post={post} />
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
                <PostAddButton post={post} />
                <PostEditButton post={post} />
                <PostDeleteButton post={post} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
