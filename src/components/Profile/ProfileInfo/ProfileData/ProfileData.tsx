import React, { FC } from "react"
import { ProfileType } from "../../../../types/types"
import Contact from "../Contact/Contact"

type Props = {
  profile: ProfileType
  status: string
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: FC<Props> = ({
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
  goToEditMode,
}) => {
  const contactsFilteredArray = Object.entries(contacts).filter(([, value]) => {
    const res = value?.trim()

    return res
  })

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

      {contactsFilteredArray.length && (
        <div>
          <div>Contacts:</div>
          {contactsFilteredArray.map(([key, value]) => (
            <Contact key={key} contactTitle={key} contactValue={value} />
          ))}
        </div>
      )}
    </>
  )
}

export default ProfileData
