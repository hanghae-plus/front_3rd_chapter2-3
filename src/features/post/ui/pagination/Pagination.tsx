import { LimitSelect } from './LimitSelect'
import { SkipButton } from './SkipButton'

export const Pagination = () => {
  return (
    <div className="flex justify-between items-center">
      <LimitSelect />

      <SkipButton />
    </div>
  )
}
