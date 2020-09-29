import React, { FC } from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import { ProfileType, TProfileEditInfo } from "../../types/types"

export type Props = {
  isOwner: boolean
  currentUserId: number | null
  profile: ProfileType | null
  status: string
  isProfileInfoEditModeOn: boolean
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  uploadPhoto: (image: File) => void
  saveProfile: (info: TProfileEditInfo) => void
  setProfileInfoEditMode: (value: boolean) => void
}

const Profile: FC<Props> = (props) => {
  return (
    <>
      <ProfileInfo {...props} />
      <MyPostsContainer />
    </>
  )
}

export default Profile
