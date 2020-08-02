import React from "react"
import { reduxForm, Field } from "redux-form"
import styles from "./Dialogs.module.scss"
import UserItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"

let NewMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="newMessage" component="textarea" />
      <button type="submit">Add</button>
    </form>
  )
}

NewMessageForm = reduxForm({
  form: "newMessage",
})(NewMessageForm)

const Dialogs = ({ dialogsPage, addMessage }) => {
  let onSubmit = (formData) => {
    addMessage(formData.newMessage)
  }

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
        <NewMessageForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default Dialogs
