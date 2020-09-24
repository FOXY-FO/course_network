import React from "react"
import s from "./ErrorMessage.module.scss"

const ErrorMessage = ({ message = null, onClose = () => {} }) => {
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

export default ErrorMessage
