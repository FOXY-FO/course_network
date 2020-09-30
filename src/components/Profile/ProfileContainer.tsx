import React, { useState, useEffect, memo, FC, ComponentType } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter, Redirect, RouteComponentProps } from "react-router-dom"
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
  uploadPhoto,
  saveProfile,
  actions,
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
  isProfileInfoEditModeOn: boolean
}

type TMapDispatchProps = {
  getProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (status: string) => void
  uploadPhoto: (image: File) => void
  saveProfile: (info: TProfileEditInfo) => void
  setProfileInfoEditMode: (value: boolean) => void
}

type TMatchParams = {
  userId: string
}

type TProps = TMapStateProps &
  TMapDispatchProps &
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
  isProfileInfoEditModeOn: state.profilePage.isProfileInfoEditModeOn,
})

export default compose<ComponentType>(
  connect<TMapStateProps, TMapDispatchProps, {}, AppStateType>(
    mapStateToProps,
    {
      getProfile: getProfileThunk,
      getUserStatus,
      updateUserStatus,
      uploadPhoto,
      saveProfile,
      setProfileInfoEditMode: actions.setIsProfileEditModeOn,
    }
  ),
  withRouter,
  memo
)(ProfileContainer)
