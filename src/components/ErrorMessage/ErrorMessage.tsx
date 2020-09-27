import React, { FC, memo } from "react"
import s from "./ErrorMessage.module.scss"

type PropsType = {
  message: string | null
  onClose: () => void
}

const ErrorMessage: FC<PropsType> = ({
  message = null,
  onClose = () => {},
}) => {
  if (!message) return null

  return (
    <div className={s.error}>
      <div className={s.errorMessage}>{message}</div>
      <button className={s.errorClose} onClick={onClose}>
        &times;
      </button>
    </div>
  )
}

export default memo(ErrorMessage)
