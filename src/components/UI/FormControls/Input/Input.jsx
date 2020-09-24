import React from "react"
import cn from "classnames"
import s from "./Input.module.scss"

let Input = ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched

  return (
    <div className={cn(s.control, { [s.error]: hasError })}>
      <input {...input} {...props} />

      {hasError && <div className={s.errorMessage}>{meta.error}</div>}
    </div>
  )
}

export default Input
