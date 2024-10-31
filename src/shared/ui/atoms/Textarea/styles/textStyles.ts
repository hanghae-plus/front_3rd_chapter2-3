export const textareaStyles = {
  base: `
    flex 
    min-h-[150px] 
    w-full 
    rounded-md 
    border 
    border-input 
    bg-white 
    px-3 
    py-2 
    text-sm 
    ring-offset-background
  `,
  placeholder: `
    placeholder:text-muted-foreground
  `,
  focus: `
    focus-visible:outline-none 
    focus-visible:ring-2 
    focus-visible:ring-ring 
    focus-visible:ring-offset-2
  `,
  disabled: `
    disabled:cursor-not-allowed 
    disabled:opacity-50
  `,
}

export const getTextareaClassName = (className?: string) => {
  return `
    ${textareaStyles.base}
    ${textareaStyles.placeholder}
    ${textareaStyles.focus}
    ${textareaStyles.disabled}
    ${className || ""}
  `.trim()
}
