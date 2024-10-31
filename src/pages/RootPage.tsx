import { AddPostDialog } from "../features/post/ui/AddPostDialog"
import { PostTable } from "../features/post/ui/PostTable"

import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card"

export const RootPage = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PostTable />
      </CardContent>
    </Card>
  )
}

export default RootPage
