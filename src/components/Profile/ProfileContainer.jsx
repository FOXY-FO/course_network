import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  getProfileThunk,
  getUserStatus,
  updateUserStatus,
} from "../../redux/profile-reducer"
import Profile from "./Profile"

class ProfileContainer extends React.Component {
  componentDidMount() {
    let { getProfile, match, currentUserId } = this.props

    getProfile(match.params.userId ? match.params.userId : currentUserId)
  }

  componentDidUpdate(prevProps) {
    let { getProfile, match, currentUserId } = this.props

    if (
      prevProps.currentUserId !== currentUserId ||
      prevProps.match.params.userId !== match.params.userId
    ) {
      getProfile(match.params.userId ? match.params.userId : currentUserId)
    }
  }

  render() {
    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  currentUserId: state.auth.userId,
})

export default compose(
  connect(mapStateToProps, {
    getProfile: getProfileThunk,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter
)(ProfileContainer)
