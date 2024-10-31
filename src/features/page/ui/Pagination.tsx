import { PageMove } from "./PageMove"
import { PageSelector } from "./PageSelector"

export const Pagination: React.FC<{
  total: number
}> = ({ total }) => {
  
  return (
    <div className="flex justify-between items-center">
      <PageSelector/>
      <PageMove total={total} />
    </div>
  )
}
