import Modal from "./modal"
import { Card } from "../../shared/ui/Card"
import Search from "./search"

const Post = () => {
  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        {/* 검색 관련 컴포넌트  */}
        <Search />
        {/* 모달 관련 컴포넌트 */}
        <Modal />
      </Card>
    </>
  )
}

export default Post
