import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { postsAPI } from "../../../entities/post"
import { Pagination } from "../../../features/pagination"
import { PostFilters } from "../../../features/postFilters"
import { PostForm } from "../../../features/postForm"
import { PostList } from "../../../features/postList"
import { PostSearch } from "../../../features/postSearch"
import { Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent } from "../../../shared/ui"

export const PostWidget = () => {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showCommentDialog, setShowCommentDialog] = useState(false)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await postsAPI.getPosts(limit, skip)
      setPosts(response.posts)
      setTotal(response.total)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [skip, limit])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <PostSearch onSearch={() => {}} />
            </div>
            <PostFilters tags={[]} onChange={() => {}} />
          </div>
          <PostList
            posts={posts}
            isLoading={isLoading}
            onTagSelect={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onCommentClick={() => {}}
            onUserClick={() => {}}
          />
        </div>
        <Pagination skip={skip} limit={limit} total={total} onSkipChange={setSkip} onLimitChange={setLimit} />
      </CardContent>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <PostForm onSubmit={() => setShowAddDialog(false)} onCancel={() => setShowAddDialog(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}
