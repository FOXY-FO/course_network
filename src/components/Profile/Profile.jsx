import React from "react"
import MyPosts from "./MyPosts/MyPosts"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = ({profilePage, dispatch}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts newPostText={profilePage.newPostText}
                     posts={profilePage.posts}
                     dispatch={dispatch} />
        </>
    )
}

export default Profile
