import React from "react"
import Settings from "./Settings"
import withAuthRedirect from "../../hoc/withAuthRedirect"

const SettingsContainer = (props) => {
  return <Settings {...props} />
}

export default withAuthRedirect(SettingsContainer)
