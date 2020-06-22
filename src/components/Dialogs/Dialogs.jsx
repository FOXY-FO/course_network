import React from "react"

import styles from "./Dialogs.module.scss"
import UserItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {addMessageCreator, updateNewMessageTextCreator} from "../../redux/dialogs-reducer";

const Dialogs = ({dialogsPage, dispatch}) => {
    let handleChange = text => {
        dispatch(updateNewMessageTextCreator(text))
    }

    let handleClick = () => {
        dispatch(addMessageCreator())
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperItem}>
                {dialogsPage.users.map(({id, name}) => (
                    <UserItem key={id} name={name}/>
                ))}
            </div>
            <div className={styles.wrapperItem}>
                <div className={styles.messages}>
                    {dialogsPage.messages.map(({id, text}) => (
                        <Message key={id}>{text}</Message>
                    ))}
                </div>
                <textarea value={dialogsPage.newMessageText} onChange={e => handleChange(e.target.value)} />
                <button onClick={handleClick}>Add</button>
            </div>
        </div>
    )
}

export default Dialogs
