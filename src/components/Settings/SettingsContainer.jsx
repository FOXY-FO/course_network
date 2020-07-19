import React from "react"
import Settings from "./Settings"
import withAuthRedirect from "../../hoc/withAuthRedirect"

class SettingsContainer extends React.Component {
  render() {
    return <Settings {...this.props} />
  }
}

export default withAuthRedirect(SettingsContainer)
