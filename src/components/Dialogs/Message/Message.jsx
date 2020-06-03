import React from "react"
import s from "./Message.module.scss"

const Message = ({ children }) => <div className={s.message}>{children}</div>

export default Message
