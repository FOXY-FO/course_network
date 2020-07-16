import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import * as axios from "axios"
import { setProfile } from "../../redux/profile-reducer"
import Profile from "./Profile"

class ProfileContainer extends React.Component {
  componentDidMount() {
    let { userId } = this.props.match.params

    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${
          userId ? userId : 2
        }`
      )
      .then((response) => {
        this.props.setProfile(response.data)
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
