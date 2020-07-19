import React from "react"
import Music from "./Music"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class MusicContainer extends React.Component {
  render() {
    if (!this.props.isAuth) return <Redirect to="/login" />

    return <Music {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(MusicContainer)
