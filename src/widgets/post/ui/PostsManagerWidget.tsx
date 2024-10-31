import React, { useState } from "react"
import { Card, CardContent } from "../../../shared/ui"
import PostSearchHeader from "../../../features/serach/ui/PostSearchHeader"
import PaginationWidget from "./PaginationWidget"
import SearchWidget from "../../../features/serach/ui/SearchWidget"
import SortBySelectWidget from "../../../features/serach/ui/SortBySelectWidget"
import SortOrderSelectWidget from "../../../features/serach/ui/SortOrderSelectWidget"
import { UserDialog } from "../../../features/user/ui/UserDialog"
import { EditCommentDialog } from "../../../features/comment/ui/EditCommentDialog"
import { AddCommentDialog } from "../../../features/comment/ui/AddCommentDialog"
import TagSelectWidget from "../../../features/serach/ui/TagSelectWidget"
import AddPostDialog from "../../../features/post/ui/AddPostDialog"
import { EditPostDialog } from "../../../features/post/ui/EditPostDialog"
import PostDetailDialog from "../../../features/post/ui/PostDetailDialog"
import PostTableWidget from "../../../features/post/ui/PostTableWidget"
import { useUrlSync } from "../../../shared/lib"
import usePost from "../../../entities/Post/model/usePost"

const PostsManagerWidget: React.FC = () => {
  const { isLoading } = usePost()
  useUrlSync()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostSearchHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchWidget />
            <TagSelectWidget />
            <SortBySelectWidget />
            <SortOrderSelectWidget />
          </div>

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTableWidget />}
          {/* 페이지네이션 */}
          <PaginationWidget />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  )
}

export default PostsManagerWidget
