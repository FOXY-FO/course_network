import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { setProfile, getProfileThunk } from "../../redux/profile-reducer"
import Profile from "./Profile"

class ProfileContainer extends React.Component {
  componentDidMount() {
    let {
      currentUserId,
      getProfile,
      match: {
        params: { userId },
      },
    } = this.props

    getProfile(userId ? userId : currentUserId)
  }

  render() {
    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  currentUserId: state.auth.userId,
})

let ProfileContainerWithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
  setProfile,
  getProfile: getProfileThunk,
})(ProfileContainerWithRouter)
