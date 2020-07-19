import React from "react"
import News from "./News"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

class NewsContainer extends React.Component {
  render() {
    if (!this.props.isAuth) return <Redirect to="/login" />

    return <News {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(NewsContainer)
