import React from "react"
import { connect } from "react-redux"
import {
  followUserThunkCreator,
  unfollowUserThunkCreator,
} from "../../../redux/users-reducer"
import User from "./User"

class UserContainer extends React.Component {
  follow = (userId) => {
    this.props.followUser(userId)
  }

  unfollow = (userId) => {
    this.props.unfollowUser(userId)
  }

  render() {
    return (
      <User {...this.props} follow={this.follow} unfollow={this.unfollow} />
    )
  }
}

export default connect(null, {
  followUser: followUserThunkCreator,
  unfollowUser: unfollowUserThunkCreator,
})(UserContainer)
