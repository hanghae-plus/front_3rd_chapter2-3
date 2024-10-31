import { Button, Textarea } from "../../../../../shared"

export const CommentForm = ({
  body,
  setBody,
  isPending,
  handleSubmit,
}: {
  body: string
  setBody: (body: string) => void
  isPending: boolean
  handleSubmit: (e: React.FormEvent) => void
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          댓글 내용
        </label>
        <Textarea
          id="comment"
          placeholder="댓글을 입력하세요"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-[100px]"
          required
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "추가 중..." : "댓글 추가"}
      </Button>
    </form>
  )
}
