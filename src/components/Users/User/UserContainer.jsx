import React from "react"
import api from "../../../api/api"
import User from "./User"

class UserContainer extends React.Component {
  follow = (userId) => {
    this.props.toggleFollowingInProgress(userId)
    api.follow.follow(userId).then((res) => {
      if (res.resultCode === 0) {
        this.props.follow(userId)
      }
      this.props.toggleFollowingInProgress(userId)
    })
  }

  unfollow = (userId) => {
    this.props.toggleFollowingInProgress(userId)
    api.follow.unfollow(userId).then((res) => {
      if (res.resultCode === 0) {
        this.props.unfollow(userId)
      }
      this.props.toggleFollowingInProgress(userId)
    })
  }

  render() {
    return (
      <User {...this.props} follow={this.follow} unfollow={this.unfollow} />
    )
  }
}

export default UserContainer
