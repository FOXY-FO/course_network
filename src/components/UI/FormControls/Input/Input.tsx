import React, { FC, HTMLProps } from "react"
import cn from "classnames"
import { WrappedFieldProps } from "redux-form"
import s from "./Input.module.scss"

const Input: FC<WrappedFieldProps & HTMLProps<HTMLInputElement>> = ({
  input,
  meta,
  ...props
}) => {
  const hasError = meta.error && meta.touched

  return (
    <div className={cn(s.control, { [s.error]: hasError })}>
      <input {...input} {...props} />

      {hasError && <div className={s.errorMessage}>{meta.error}</div>}
    </div>
  )
}

export default Input
