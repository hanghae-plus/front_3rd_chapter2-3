import { Button, Textarea } from '@shared/ui'
import { FC } from 'react'

interface EditFormProps {
  value: string
  placeholder: string
  submitText: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: () => void
}

export const EditForm: FC<EditFormProps> = ({ value, placeholder, submitText, onChange, onSubmit }) => {
  return (
    <>
      <Textarea placeholder={placeholder} value={value || ''} onChange={onChange} />
      <Button onClick={onSubmit}>{submitText}</Button>
    </>
  )
}
