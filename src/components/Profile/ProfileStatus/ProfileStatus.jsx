import React, { useState, useEffect } from "react"
import s from "./ProfileStatus.module.scss"

class ProfileStatusClass extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({ editMode: true })
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false })
    this.props.updateUserStatus(this.state.status)
  }

  onStatusChange = (status) => {
    this.setState({ status })
  }

  componentDidMount() {
    this.props.getUserStatus(this.props.currentUserId)
    this.setState({ status: this.props.status })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUserId !== this.props.currentUserId) {
      this.props.getUserStatus(this.props.currentUserId)
    }

    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status })
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode && (
          <div>
            <div className={s.inactive} onDoubleClick={this.activateEditMode}>
              {this.state.status}
            </div>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              autoFocus
              onBlur={this.deactivateEditMode}
              type="text"
              value={this.state.status}
              onChange={(e) => {
                this.onStatusChange(e.target.value)
              }}
            />
          </div>
        )}
      </>
    )
  }
}

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

export default ProfileStatusClass
