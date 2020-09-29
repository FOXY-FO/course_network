import React, { FC } from "react"
import s from "./Contact.module.scss"

type Props = {
  contactTitle: string
  contactValue: string | null
}

const Contact: FC<Props> = ({ contactTitle, contactValue }) => (
  <div className={s.contact}>
    <b>{contactTitle}:</b> {contactValue}
  </div>
)

export default Contact
