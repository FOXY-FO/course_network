import React from "react"
import s from "./ProfileInfo.module.scss"
import Preloader from "../../UI/Preloader/Preloader"

const ProfileInfo = ({ profile }) => {
  if (!profile) return <Preloader />

  let { photos, fullName, aboutMe, userId } = profile

  return (
    <div>
      <div className={s.img}>
        <img src={photos.large} alt="" />
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
