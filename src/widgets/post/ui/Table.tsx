import { useEffect } from "react"
import useQueryParams from "../../../app/lib/params"
import { Post, usePost } from "../../../entities/post/model/post"
import { useQuerygGetPosts } from "../../../features/post/api/getPosts"
import PostItem from "../../../features/post/ui/Item"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui/table"

// 게시물 테이블 렌더링
const PostTable: React.FC = () => {
  // entities
  const { posts, setPosts } = usePost()
  const { limit, skip } = useQueryParams()
  // tanstack
  const { data, isLoading, isError, error } = useQuerygGetPosts(limit, skip)

  if (isLoading) return <>loading...</>
  if (isError) {
    console.error("게시물 가져오기 오류:", error)
  }

  useEffect(() => {
    if (data) {
      setPosts(data)
    }
  }, [data])

  const fetchPosts = () => {
    // fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     postsData = data
    //     return fetch("/api/users?limit=0&select=username,image")
    //   })
    //   .then((response) => response.json())
    //   .then((users) => {
    //     usersData = users.users
    //     const postsWithUsers = postsData.posts.map((post) => ({
    //       ...post,
    //       author: usersData.find((user) => user.id === post.userId),
    //     }))
    //     setPosts(postsWithUsers)
    //     setTotal(postsData.total)
    //   })
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
        {posts.map((post: Post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable
