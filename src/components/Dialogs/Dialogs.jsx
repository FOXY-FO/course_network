import React from "react"
import styles from "./Dialogs.module.scss"
import UserItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"

const Dialogs = ({ dialogsPage }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
        {dialogsPage.users.map(({ id, name }) => (
          <UserItem key={id} name={name} />
        ))}
      </div>
      <div className={styles.wrapperItem}>
        <div className={styles.messages}>
          {dialogsPage.messages.map(({ id, text }) => (
            <Message key={id}>{text}</Message>
          ))}
        </div>
        <textarea></textarea>
        <button>Add</button>
      </div>
    </div>
  )
}

export default Dialogs
