import React, { useState, useEffect } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter, Redirect } from "react-router-dom"
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
} from "../../redux/profile-reducer"
import Profile from "./Profile"

let ProfileContainer = ({
  getProfile,
  match,
  currentUserId,
  isAuth,
  ...props
}) => {
  let [shouldRedirect, setShouldRedirect] = useState(false)

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

  return <Profile {...props} />
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  currentUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect(mapStateToProps, {
    getProfile: getProfileThunk,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter
)(ProfileContainer)
