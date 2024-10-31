import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../shared/ui/button/ui/Button"
import { Input } from "../shared/ui/input/ui/Input.tsx"
import { Textarea } from "../shared/ui/textarea/ui/Textarea.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/select/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shared/ui/table/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/dialog/ui"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card/ui"
import PostTagsItem from "../entities/post/ui/PostTagsItem.tsx"
import PostReactionsItem from "../entities/post/ui/PostReactionsItem.tsx"
import PostTable from "../widgets/post/ui/PostTable.tsx"
import { Post } from "../entities/post/model/types.ts"
import { usePostsStore } from "../features/post/model/usePostsStore.ts"
import { highlightText } from "../shared/lib/highlightText.tsx"
import { useQueryPostsAndUsers } from "../features/post/api/useQueryPostsAndUsers.ts"
import usePostQueryParams from "../features/post/model/usePostURLParams.ts"
import PostAddButton from "../features/post-add/ui/PostAddButton.tsx"
import PostSearchItem from "../features/post-search/ui/PostSearchItem.tsx"

const PostsManager = () => {
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag, setParam } = usePostQueryParams()
  const { total, isLoading } = usePostsStore((state) => state)
  useQueryPostsAndUsers(limit, skip, selectedTag)

  const postQueryParams = {
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setParam,
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostSearchItem {...postQueryParams} />
          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setParam("limit", value)}>
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
              <Button disabled={skip === 0} onClick={() => setParam("skip", Math.max(0, skip - limit).toString())}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setParam("skip", (skip + limit).toString())}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
