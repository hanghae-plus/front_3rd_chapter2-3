import { PageMove } from "./PageMove"
import { PageSelector } from "./PageSelector"

export const Pagination: React.FC<{
  skip: number
  limit: number
  total: number
  setLimit: (value: number) => void
  setSkip: (value: number) => void
}> = ({ skip, limit, total, setLimit, setSkip }) => {
  return (
    <div className="flex justify-between items-center">
      <PageSelector limit={limit} setLimit={setLimit} />
      <PageMove skip={skip} limit={limit} total={total} setSkip={setSkip} />
    </div>
  )
}
