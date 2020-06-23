import React from "react"
import {addPostActionCreator, changeNewPostTextActionCreator} from "../../../redux/profile-reducer";
import NewPost from "./NewPost";
import StoreContext from "../../../StoreContext";

const NewPostContainer = () => {
    return (
        <StoreContext.Consumer>
            {store => {
                let handleChange = text => {
                    store.dispatch(changeNewPostTextActionCreator(text))
                }

                let handleClick = () => {
                    store.dispatch(addPostActionCreator())
                }

                return (
                    <NewPost
                        newPostText={store.getState().profilePage.newPostText}
                        updateNewPostText={handleChange}
                        addPost={handleClick}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default NewPostContainer
