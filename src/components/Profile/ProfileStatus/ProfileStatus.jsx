import React from "react"
import s from "./ProfileStatus.module.scss"

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    })

    this.props.updateUserStatus(this.state.status)
  }
  onStatusChange = (status) => {
    this.setState({
      status,
    })
  }

  componentDidMount() {
    this.props.getUserStatus(this.props.currentUserId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUserId !== this.props.currentUserId) {
      this.props.getUserStatus(this.props.currentUserId)
    }
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      })
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode && (
          <div>
            <div className={s.inactive} onDoubleClick={this.activateEditMode}>
              {this.props.status}
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

export default ProfileStatus
