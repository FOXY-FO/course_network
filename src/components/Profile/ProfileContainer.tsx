import React, { useState, useEffect, memo, FC } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter, Redirect, RouteComponentProps } from "react-router-dom"
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
  uploadPhoto,
  saveProfile,
} from "../../redux/profile-reducer"
import { getProfile, getStatus } from "../../redux/selectors/profile-selectors"
import { getIsAuth, getUserId } from "../../redux/selectors/auth-selectors"
import { AppStateType } from "../../redux/redux-store"
import { ProfileType, TProfileEditInfo } from "../../types/types"
import Profile from "./Profile"

type TMapStateProps = {
  profile: ProfileType | null
  status: string
  currentUserId: number | null
  isAuth: boolean
}

type TMapDispatchProps = {
  getProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  uploadPhoto: (image: string) => void
  saveProfile: (info: TProfileEditInfo) => void
}

type TOwnProps = {}

type TMatchParams = {
  userId: string
}

type TProps = TMapStateProps &
  TMapDispatchProps &
  TOwnProps &
  RouteComponentProps<TMatchParams>

const ProfileContainer: FC<TProps> = ({
  getProfile,
  match,
  currentUserId,
  isAuth,
  ...props
}) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const userId = parseInt(match.params.userId)
  const isOwner = isAuth && !userId

  useEffect(() => {
    if (isAuth) {
      getProfile(userId ? userId : currentUserId!)
    } else {
      if (userId) {
        getProfile(userId)
      } else {
        setShouldRedirect(true)
      }
    }
  }, [match, getProfile, currentUserId, isAuth, userId])

  if (shouldRedirect) {
    return <Redirect to="/login" />
  }

  return <Profile {...props} isOwner={isOwner} currentUserId={currentUserId} />
}

const mapStateToProps = (state: AppStateType): TMapStateProps => ({
  profile: getProfile(state),
  status: getStatus(state),
  currentUserId: getUserId(state),
  isAuth: getIsAuth(state),
})

export default compose(
  connect<TMapStateProps, TMapDispatchProps, TOwnProps, AppStateType>(
    mapStateToProps,
    {
      getProfile: getProfileThunk,
      getUserStatus,
      updateUserStatus,
      uploadPhoto,
      saveProfile,
    }
  ),
  withRouter,
  memo
)(ProfileContainer)
