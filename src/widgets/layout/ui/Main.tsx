import React from "react"

interface Props {
  children: React.ReactNode
}

const Main: React.FC<Props> = ({ children }) => {
  return <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
}

export default Main
