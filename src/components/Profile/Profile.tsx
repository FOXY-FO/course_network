import React, { FC } from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer"

const Profile: FC<any> = (props) => {
  return (
    <>
      <ProfileInfo {...props} />
      <MyPostsContainer />
    </>
  )
}

export default Profile
