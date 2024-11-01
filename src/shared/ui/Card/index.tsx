import { CardRoot } from "./CardRoot"
import { CardHeader } from "./CardHeader"
import { CardTitle } from "./CardTitle"
import { CardContent } from "./CardContent"

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
})
