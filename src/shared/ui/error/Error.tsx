interface Props {
  message: string
}

export const Error = ({ message }: Props) => {
  return <div className="flex justify-center p-4">Error: {message}</div>
}
