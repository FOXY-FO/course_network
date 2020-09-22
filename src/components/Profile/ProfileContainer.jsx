import React, { useState, useEffect } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter, Redirect } from "react-router-dom"
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
  uploadPhoto,
  saveProfile,
} from "../../redux/profile-reducer"
import Profile from "./Profile"
import { getProfile, getStatus } from "../../redux/selectors/profile-selectors"
import { getIsAuth, getUserId } from "../../redux/selectors/auth-selectors"

let ProfileContainer = ({
  getProfile,
  match,
  currentUserId,
  isAuth,
  ...props
}) => {
  let [shouldRedirect, setShouldRedirect] = useState(false)
  let isOwner = isAuth && !match.params.userId

  useEffect(() => {
    if (isAuth) {
      getProfile(match.params.userId ? match.params.userId : currentUserId)
    } else {
      if (match.params.userId) {
        getProfile(match.params.userId)
      } else {
        setShouldRedirect(true)
      }
    }
  }, [match, getProfile, currentUserId, isAuth])

  if (shouldRedirect) {
    return <Redirect to="/login" />
  }

  return <Profile {...props} isOwner={isOwner} currentUserId={currentUserId} />
}

let mapStateToProps = (state) => ({
  profile: getProfile(state),
  status: getStatus(state),
  currentUserId: getUserId(state),
  isAuth: getIsAuth(state),
})

export default compose(
  connect(mapStateToProps, {
    getProfile: getProfileThunk,
    getUserStatus,
    updateUserStatus,
    uploadPhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer)
