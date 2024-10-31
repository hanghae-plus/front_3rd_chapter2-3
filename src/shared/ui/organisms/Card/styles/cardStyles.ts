export const cardStyles = {
  card: "rounded-lg border bg-card text-card-foreground shadow-sm",
  header: "flex flex-col space-y-1.5 p-6",
  title: "text-2xl font-semibold leading-none tracking-tight",
  content: "p-6 pt-0",
}

export const getClassName = (baseStyle: string, className?: string) => {
  return `${baseStyle} ${className || ""}`.trim()
}
