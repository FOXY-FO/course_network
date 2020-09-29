import React, { useState, useEffect, FC, ReactNode } from "react"
import s from "./ProfileStatus.module.scss"

type Props = {
  currentUserId: number | null
  status: string
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  children?: React.ReactNode
}

const ProfileStatus: FC<Props> = ({
  getUserStatus,
  currentUserId,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    if (currentUserId !== null) {
      getUserStatus(currentUserId)
    }
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

  const onStatusChange = (status: string) => {
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
