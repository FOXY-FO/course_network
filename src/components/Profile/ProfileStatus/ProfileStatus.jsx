import React from "react"

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  componentDidMount() {
    this.props.getUserStatus(2)
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

  render() {
    return (
      <>
        {!this.state.editMode && (
          <div>
            <div onDoubleClick={this.activateEditMode}>{this.props.status}</div>
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
