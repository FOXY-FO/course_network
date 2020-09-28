import React, { FC, HTMLProps } from "react"
import cn from "classnames"
import { WrappedFieldProps } from "redux-form"
import s from "./Textarea.module.scss"

const Textarea: FC<WrappedFieldProps & HTMLProps<HTMLTextAreaElement>> = ({
  input,
  meta,
  ...props
}) => {
  let hasError = meta.error && meta.touched

  return (
    <div className={cn(s.control, { [s.error]: hasError })}>
      <textarea {...input} {...props} />

      {hasError && <div className={s.errorMessage}>{meta.error}</div>}
    </div>
  )
}

export default Textarea
