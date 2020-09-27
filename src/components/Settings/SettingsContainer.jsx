import React, { memo } from "react"
import Settings from "./Settings"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { compose } from "redux"

const SettingsContainer = (props) => {
  return <Settings {...props} />
}

export default compose(withAuthRedirect, memo)(SettingsContainer)
