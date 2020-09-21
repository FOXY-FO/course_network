import React, { useState, useEffect } from "react"
import s from "./ProfileStatus.module.scss"

const ProfileStatus = ({ getUserStatus, currentUserId, ...props }) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    getUserStatus(currentUserId)
  }, [currentUserId, getUserStatus])

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateUserStatus(status)
  }

  const onStatusChange = (status) => {
    setStatus(status)
  }

  return (
    <>
      {!editMode && (
        <div>
          <div className={s.inactive} onDoubleClick={activateEditMode}>
            {status}
          </div>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            type="text"
            value={status}
            onChange={(e) => {
              onStatusChange(e.target.value)
            }}
          />
        </div>
      )}
    </>
  )
}

export default ProfileStatus
