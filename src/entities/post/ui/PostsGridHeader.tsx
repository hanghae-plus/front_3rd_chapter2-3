import { TableHead, TableHeader, TableRow } from "@shared/ui"
import React from "react"

export const PostsGridHeader: React.FC = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">ID</TableHead>
      <TableHead>제목</TableHead>
      <TableHead className="w-[150px]">작성자</TableHead>
      <TableHead className="w-[150px]">반응</TableHead>
      <TableHead className="w-[150px]">작업</TableHead>
    </TableRow>
  </TableHeader>
)

PostsGridHeader.displayName = "PostsHeader"
