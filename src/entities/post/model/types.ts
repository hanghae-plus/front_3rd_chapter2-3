export interface PostFormData {
  title: string
  body: string
  userId: number
}

export interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>
  isSubmitting: boolean
  initialValues?: Partial<PostFormData>
  onCancel?: () => void
  submitLabel?: string
  mode?: 'create' | 'edit'
}