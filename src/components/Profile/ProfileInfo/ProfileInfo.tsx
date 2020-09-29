import React, { ChangeEvent, FC } from "react"
import s from "./ProfileInfo.module.scss"
import { TProfileEditInfo } from "../../../types/types"
import { Props } from "../Profile"
import noImage from "../../../assets/img/no-user.jpg"
import Preloader from "../../UI/Preloader/Preloader"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm"
import ProfileData from "./ProfileData/ProfileData"

const ProfileInfo: FC<Props> = ({
  profile,
  uploadPhoto,
  isOwner,
  saveProfile,
  isProfileInfoEditModeOn,
  setProfileInfoEditMode,
  ...props
}) => {
  const onUploadPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadPhoto(e.target.files[0])
    }
  }

  if (!profile) return <Preloader />

  const onEditProfileSubmit = (formData: TProfileEditInfo) => {
    saveProfile(formData)
  }

  return (
    <div>
      <div className={s.img}>
        <img src={profile.photos.large || noImage} alt="" />
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
        {!isProfileInfoEditModeOn ? (
          <ProfileData
            goToEditMode={() => setProfileInfoEditMode(true)}
            isOwner={isOwner}
            profile={profile}
            status={props.status}
          />
        ) : (
          <ProfileDataForm
            onSubmit={onEditProfileSubmit}
            initialValues={profile}
            profile={profile}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
