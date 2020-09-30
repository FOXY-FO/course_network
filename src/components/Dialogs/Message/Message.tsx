import React, { FC } from "react"
import s from "./Message.module.scss"

const Message: FC = ({ children }) => (
  <div className={s.message}>{children}</div>
)

export default Message
