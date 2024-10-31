export const inputStyles = {
  base: `
    flex 
    h-10 
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
  file: `
    file:border-0 
    file:bg-transparent 
    file:text-sm 
    file:font-medium
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

export const getInputClassName = (className?: string) => {
  return `
    ${inputStyles.base}
    ${inputStyles.file}
    ${inputStyles.placeholder}
    ${inputStyles.focus}
    ${inputStyles.disabled}
    ${className || ""}
  `.trim()
}
