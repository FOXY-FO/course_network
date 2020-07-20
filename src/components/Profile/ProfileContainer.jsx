import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getProfileThunk } from "../../redux/profile-reducer"
import Profile from "./Profile"
import { compose } from "redux"

let ProfileContainer = ({
  getProfile,
  currentUserId,
  match: { params },
  ...props
}) => {
  useEffect(() => {
    getProfile(params.userId ? params.userId : currentUserId)
  }, [params.userId, currentUserId, getProfile])

  return <Profile {...props} />
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  currentUserId: state.auth.userId,
})

export default compose(
  connect(mapStateToProps, { getProfile: getProfileThunk }),
  withRouter
  // withAuthRedirect
)(ProfileContainer)
