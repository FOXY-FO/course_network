import React, { useState } from "react"
import s from "./ProfileInfo.module.scss"
import noImage from "../../../assets/img/no-user.jpg"
import Preloader from "../../UI/Preloader/Preloader"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm"
import Contact from "./Contact/Contact"

const ProfileInfo = ({
  profile,
  uploadPhoto,
  isOwner,
  saveProfile,
  ...props
}) => {
  let [editMode, setEditMode] = useState(false)

  const onUploadPhotoChange = (e) => {
    if (e.target.files.length) uploadPhoto(e.target.files[0])
  }

  if (!profile) return <Preloader />

  const onEditProfileSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
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
        {!editMode ? (
          <ProfileData
            goToEditMode={() => setEditMode(true)}
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

const ProfileData = ({
  profile: {
    fullName,
    aboutMe,
    userId,
    lookingForAJob,
    lookingForAJobDescription,
    contacts,
  },
  status,
  isOwner,
  goToEditMode = () => {},
}) => {
  const filteredKeysContacts = Object.keys(contacts).filter((key) =>
    typeof contacts[key] === "string" ? contacts[key].trim() : contacts[key]
  )

  return (
    <>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Name:</b> {fullName}
      </div>
      {aboutMe && (
        <div>
          <b>About me:</b> {aboutMe}
        </div>
      )}
      <div>
        <b>User ID:</b> {userId}
      </div>
      <div>
        <b>Status:</b> {status}
      </div>
      <div>
        <b>Looking for a job:</b> {lookingForAJob ? "yes" : "no"}
      </div>
      {lookingForAJob && (
        <div>
          <b>Skills:</b> {lookingForAJobDescription}
        </div>
      )}

      {filteredKeysContacts.length !== 0 && (
        <div>
          <div>Contacts:</div>
          {filteredKeysContacts.map((key) => (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={contacts[key]}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ProfileInfo
