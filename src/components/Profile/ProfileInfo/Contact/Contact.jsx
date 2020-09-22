import React from "react"
import s from "./Contact.module.scss"

const Contact = ({ contactTitle, contactValue }) => (
  <div className={s.contact}>
    <b>{contactTitle}:</b> {contactValue}
  </div>
)

export default Contact
