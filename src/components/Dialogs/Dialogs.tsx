import React, { FC } from "react"
import { reduxForm, InjectedFormProps } from "redux-form"
import styles from "./Dialogs.module.scss"
import { createField } from "../UI/FormControls/FormControls"
import { InitialStateType as DialogsPageType } from "../../redux/dialogs-reducer"
import UserItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"

const NewMessageForm: FC<InjectedFormProps<FormDataValues>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<FormDataValuesKeys>(undefined, "newMessage", [], "textarea")}
      <button type="submit">Add</button>
    </form>
  )
}

const NewMessageFormRedux = reduxForm<FormDataValues>({
  form: "newMessage",
})(NewMessageForm)

type FormDataValues = {
  newMessage: string
}

type FormDataValuesKeys = Extract<keyof FormDataValues, string>

type Props = {
  dialogsPage: DialogsPageType
  addMessage: (message: string) => void
}

const Dialogs: FC<Props> = ({ dialogsPage, addMessage }) => {
  let onSubmit = (formData: FormDataValues) => {
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
        <NewMessageFormRedux onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default Dialogs
