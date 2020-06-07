import React from "react"
import MyPosts from "./MyPosts/MyPosts"
import ProfileInfo from "./ProfileInfo/ProfileInfo"

const Profile = ({profilePage, addPost, changeNewPostText}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts newPostText={profilePage.newPostText} posts={profilePage.posts} addPost={addPost}
                     changeNewPostText={changeNewPostText}/>
        </>
    )
}

export default Profile
