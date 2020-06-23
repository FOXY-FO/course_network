import React from "react"
import MyPosts from "./MyPosts/MyPosts"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = ({profilePage, dispatch, store}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts newPostText={profilePage.newPostText}
                     posts={profilePage.posts}
                     store={store}
                     dispatch={dispatch} />
        </>
    )
}

export default Profile
