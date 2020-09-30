import React, { FC } from "react"
import { connect } from "react-redux"
import {
  followUserThunkCreator,
  unfollowUserThunkCreator,
} from "../../../redux/users-reducer"
import { UserType } from "../../../types/types"
import User from "./User"

type MapState = {}
type MapDispatch = {
  followUser: (id: number) => void
  unfollowUser: (id: number) => void
}

export type OwnProps = UserType & {
  followingInProgress: number[]
}

type Props = MapState & MapDispatch & OwnProps

const UserContainer: FC<Props> = ({ followUser, unfollowUser, ...props }) => {
  const follow = (userId: number) => {
    followUser(userId)
  }

  const unfollow = (userId: number) => {
    unfollowUser(userId)
  }

  return <User {...props} follow={follow} unfollow={unfollow} />
}

export default connect<MapState, MapDispatch, OwnProps>(null, {
  followUser: followUserThunkCreator,
  unfollowUser: unfollowUserThunkCreator,
})(UserContainer)
