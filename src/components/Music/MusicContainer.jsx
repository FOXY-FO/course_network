import React from "react"
import Music from "./Music"
import withAuthRedirect from "../../hoc/withAuthRedirect"

class MusicContainer extends React.Component {
  render() {
    return <Music {...this.props} />
  }
}

export default withAuthRedirect(MusicContainer)
