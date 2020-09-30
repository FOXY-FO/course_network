import React, { ComponentType, memo, FC } from "react"
import Settings from "./Settings"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { compose } from "redux"

const SettingsContainer: FC = () => {
  return <Settings />
}

export default compose<ComponentType>(withAuthRedirect, memo)(SettingsContainer)
