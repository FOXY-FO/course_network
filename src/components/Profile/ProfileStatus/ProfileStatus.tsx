import React, { useState, useEffect, FC } from "react"
import s from "./ProfileStatus.module.scss"
import { getUserStatus, updateUserStatus } from "../../../redux/profile-reducer"
import { useDispatch } from "react-redux"

type Props = {
  currentUserId: number | null
  status: string
}

const ProfileStatus: FC<Props> = ({ currentUserId, status: propsStatus }) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(propsStatus)

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUserId !== null) {
      dispatch(getUserStatus(currentUserId))
    }
  }, [currentUserId, dispatch])

  useEffect(() => {
    setStatus(propsStatus)
  }, [propsStatus])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    dispatch(updateUserStatus(status))
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
