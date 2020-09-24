import React from "react"
import cn from "classnames"
import s from "./Textarea.module.scss"

let Textarea = ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched

  return (
    <div className={cn(s.control, { [s.error]: hasError })}>
      <textarea {...input} {...props} />

      {hasError && <div className={s.errorMessage}>{meta.error}</div>}
    </div>
  )
}

export default Textarea
