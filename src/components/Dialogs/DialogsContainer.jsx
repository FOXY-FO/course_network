import React from "react"

import {addMessageCreator, updateNewMessageTextCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = ({dialogsPage, dispatch}) => {
    let handleChange = text => {
        dispatch(updateNewMessageTextCreator(text))
    }

    let handleClick = () => {
        dispatch(addMessageCreator())
    }

    return <Dialogs
        dialogsPage={dialogsPage}
        updateMessageText={handleChange}
        addMessage={handleClick}
    />
}

export default DialogsContainer
