import React, { ChangeEvent, FC, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import s from "./ProfileInfo.module.scss"
import {
  uploadPhoto,
  saveProfile,
  actions,
} from "../../../redux/profile-reducer"
import { TProfileEditInfo } from "../../../types/types"
import {
  getIsProfileInfoEditModeOn,
  getProfile,
  getStatus,
} from "../../../redux/selectors/profile-selectors"
import noImage from "../../../assets/img/no-user.jpg"
import Preloader from "../../UI/Preloader/Preloader"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm"
import ProfileData from "./ProfileData/ProfileData"

type Props = {
  isOwner: boolean
  currentUserId: number | null
}

export const ProfileInfo: FC<Props> = memo(({ isOwner, currentUserId }) => {
  const profile = useSelector(getProfile)
  const isProfileInfoEditModeOn = useSelector(getIsProfileInfoEditModeOn)
  const status = useSelector(getStatus)

  const dispatch = useDispatch()

  const onUploadPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(uploadPhoto(e.target.files[0]))
    }
  }

  if (!profile) return <Preloader />

  const onEditProfileSubmit = (formData: TProfileEditInfo) => {
    dispatch(saveProfile(formData))
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
        <ProfileStatus status={status} currentUserId={currentUserId} />
      </div>
      <div className={s.info}>
        {!isProfileInfoEditModeOn ? (
          <ProfileData
            goToEditMode={() => dispatch(actions.setIsProfileEditModeOn(true))}
            isOwner={isOwner}
            profile={profile}
            status={status}
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
})
