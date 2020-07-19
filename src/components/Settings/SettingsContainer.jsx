import React from "react"
import Settings from "./Settings"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class SettingsContainer extends React.Component {
  render() {
    if (!this.props.isAuth) return <Redirect to="/login" />

    return <Settings {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(SettingsContainer)
