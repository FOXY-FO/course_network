import React from "react"
import s from "./ProfileInfo.module.scss"
import noImage from "../../../assets/img/no-user.jpg"
import Preloader from "../../UI/Preloader/Preloader"
import ProfileStatus from "../ProfileStatus/ProfileStatus"

const ProfileInfo = ({ profile }) => {
  if (!profile) return <Preloader />

  let { photos, fullName, aboutMe, userId } = profile

  return (
    <div>
      <div className={s.img}>
        <img src={photos.large ? photos.large : noImage} alt="" />
      </div>
      <div>
        <ProfileStatus status={"Hello there!"} />
      </div>
      <div className={s.info}>
        <div>name: {fullName}</div>
        <div>aboutMe: {aboutMe}</div>
        <div>userId: {userId}</div>
      </div>
    </div>
  )
}

export default ProfileInfo
