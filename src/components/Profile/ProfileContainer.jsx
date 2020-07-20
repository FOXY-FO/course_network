import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
} from "../../redux/profile-reducer"
import Profile from "./Profile"
import { compose } from "redux"

let ProfileContainer = ({ getProfile, match: { params }, ...props }) => {
  useEffect(() => {
    getProfile(params.userId ? params.userId : 2)
  }, [params.userId, getProfile])

  return <Profile {...props} />
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
})

export default compose(
  connect(mapStateToProps, {
    getProfile: getProfileThunk,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter
)(ProfileContainer)
