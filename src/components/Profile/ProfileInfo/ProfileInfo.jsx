import React from "react"
import s from "./ProfileInfo.module.scss"
import noImage from "../../../assets/img/no-user.jpg"
import Preloader from "../../UI/Preloader/Preloader"
import ProfileStatus from "../ProfileStatus/ProfileStatus"

const ProfileInfo = ({ profile, uploadPhoto, ...props }) => {
  if (!profile) return <Preloader />

  let { photos, fullName, aboutMe, userId } = profile

  const onUploadPhotoChange = (e) => {
    if (e.target.files.length) uploadPhoto(e.target.files[0])
  }

  return (
    <div>
      <div className={s.img}>
        <img src={photos.large || noImage} alt="" />
        <div>
          <label htmlFor="avatar">Choose a profile picture:</label>

          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onUploadPhotoChange}
          />
        </div>
      </div>
      <div>
        <ProfileStatus {...props} />
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
