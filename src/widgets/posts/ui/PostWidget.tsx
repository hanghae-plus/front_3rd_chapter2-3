// src/widgets/posts/ui/PostWidget/index.tsx
import { Plus } from "lucide-react"
import { usePostsData, usePostsStore } from "../../../entities/post"
import { Pagination } from "../../../features/pagination"
import { PostFilters } from "../../../features/postFilters"
import { PostForm } from "../../../features/postForm"
import { PostList } from "../../../features/postList"
import { PostSearch } from "../../../features/postSearch"
import { Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent } from "../../../shared/ui"

export const PostWidget = () => {
  const {
    posts,
    isLoading,
    modalType,
    total,
    skip,
    limit,
    searchQuery,
    setModalType,
    setSkip,
    setLimit,
    setSearchQuery,
    setSelectedTag,
  } = usePostsStore()

  usePostsData()

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setModalType("add")}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search & Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <PostSearch value={searchQuery} onSearch={handleSearchSubmit} />
          </div>
          <PostFilters onChange={handleFilterChange} />
        </div>

        {/* Post List */}
        <PostList
          posts={posts}
          isLoading={isLoading}
          onTagSelect={handleFilterChange}
          onEdit={() => setModalType("edit")}
          onDelete={() => {}}
          onCommentClick={() => setModalType("comment")}
          onUserClick={() => {}}
        />

        {/* Pagination */}
        <Pagination skip={skip} limit={limit} total={total} onSkipChange={setSkip} onLimitChange={setLimit} />
      </CardContent>

      {/* Modals */}
      <Dialog open={modalType === "add"} onOpenChange={() => setModalType(null)}>
        <DialogContent>
          <PostForm onSubmit={() => setModalType(null)} onCancel={() => setModalType(null)} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}
