import { DialogContainer } from "./DialogContainer"

interface DialogProviderProps_i {
  children: React.ReactNode
}

export const DialogProvider = ({ children }: DialogProviderProps_i) => {
  return (
    <>
      {children}
      <DialogContainer />
    </>
  )
}
