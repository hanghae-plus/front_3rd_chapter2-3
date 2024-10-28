interface LoadingProps {
  message?: string
}

export const Loading = ({ message = "로딩 중..." }: LoadingProps) => {
  return (
    <div className="flex justify-center p-4">
      {message}
    </div>
  )
}