import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import api from "../../api/api"
import { setProfile } from "../../redux/profile-reducer"
import Profile from "./Profile"

class ProfileContainer extends React.Component {
  componentDidMount() {
    let { userId } = this.props.match.params

    api.profile.getProfile(userId ? userId : 2).then((response) => {
      this.props.setProfile(response)
    })
  }

  render() {
    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

let ProfileContainerWithRouter = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setProfile })(
  ProfileContainerWithRouter
)
