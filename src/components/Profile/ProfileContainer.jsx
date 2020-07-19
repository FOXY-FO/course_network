import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter, Redirect } from "react-router-dom"
import { getProfileThunk } from "../../redux/profile-reducer"
import Profile from "./Profile"

let ProfileContainer = ({
  getProfile,
  currentUserId,
  match: { params },
  isAuth,
  ...props
}) => {
  let shouldRedirect = false

  useEffect(() => {
    getProfile(params.userId ? params.userId : currentUserId)
  }, [params.userId, currentUserId])

  if (!params.userId && !isAuth) shouldRedirect = true

  if (shouldRedirect) return <Redirect to="/login" />

  return <Profile {...props} />
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  currentUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

let ProfileContainerWithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
  getProfile: getProfileThunk,
})(ProfileContainerWithRouter)
