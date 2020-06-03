import React from "react"
import styles from "./Dialogs.module.scss"
import UserItem from "./UserItem/UserItem"

const Dialogs = () => {
  const users = [
    {
      id: 1,
      name: "Vlad",
    },
    {
      id: 2,
      name: "Alina",
    },
    {
      id: 3,
      name: "Liza",
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
        {users.map(({ id, name }) => (
          <UserItem key={id} name={name} />
        ))}
      </div>
      <div className={styles.wrapperItem}>
        <div className={styles.messages}>
          <div className={styles.message}>Hi</div>
          <div className={styles.message}>How are you?</div>
          <div className={styles.message}>I'm fine, thank you</div>
        </div>
        <textarea></textarea>
        <button>Add</button>
      </div>
    </div>
  )
}

export default Dialogs
