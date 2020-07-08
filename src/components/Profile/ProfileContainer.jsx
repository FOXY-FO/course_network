import React from "react"
import { connect } from "react-redux"
import * as axios from "axios"
import { setProfile } from "../../redux/profile-reducer"
import Profile from "./Profile"

class ProfileContainer extends React.Component {
  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/profile/2")
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

export default connect(mapStateToProps, { setProfile })(ProfileContainer)
