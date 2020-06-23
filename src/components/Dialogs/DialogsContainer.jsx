import React from "react"

import {addMessageCreator, updateNewMessageTextCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {store => {
                let handleChange = text => {
                    store.dispatch(updateNewMessageTextCreator(text))
                }

                let handleClick = () => {
                    store.dispatch(addMessageCreator())
                }

                return (
                    <Dialogs
                        dialogsPage={store.getState().dialogsPage}
                        updateMessageText={handleChange}
                        addMessage={handleClick}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer
