import React from "react"
import MyPosts from "./MyPosts/MyPosts"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = ({profilePage}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={profilePage.posts} />
        </>
    )
}

export default Profile
