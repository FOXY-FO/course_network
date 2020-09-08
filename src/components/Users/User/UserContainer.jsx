import React from "react"
import { connect } from "react-redux"
import {
  followUserThunkCreator,
  unfollowUserThunkCreator,
} from "../../../redux/users-reducer"
import User from "./User"

const UserContainer = (props) => {
  const follow = (userId) => {
    props.followUser(userId)
  }

  const unfollow = (userId) => {
    props.unfollowUser(userId)
  }

  return <User {...props} follow={follow} unfollow={unfollow} />
}

export default connect(null, {
  followUser: followUserThunkCreator,
  unfollowUser: unfollowUserThunkCreator,
})(UserContainer)
