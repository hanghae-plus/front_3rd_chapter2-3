export const Contents: React.FC<{
  children: React.ReactNode
}> = ({
  children
}) => {
  return(
    <div className="flex flex-col gap-4">
      {children}
    </div>
  )
}