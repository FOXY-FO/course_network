import React from "react"
import { connect } from "react-redux"
import api from "../../../api/api"
import { setUserData } from "../../../redux/auth-reducer"
import Header from "./Header"

class HeaderContainer extends React.Component {
  componentDidMount() {
    api.auth.getCurrentUserProfile().then((response) => {
      if (response.resultCode === 0) {
        let { id, email, login } = response.data
        this.props.setUserData(id, email, login)
      }
    })
  }

  render() {
    return <Header {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { setUserData })(HeaderContainer)
