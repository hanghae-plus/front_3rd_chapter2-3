import React from "react"

interface Props {
  children: React.ReactNode
}

const Main = ({ children }: Props) => {
  return <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
}

export default Main
