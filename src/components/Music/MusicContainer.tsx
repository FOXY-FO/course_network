import React, { ComponentType, FC, memo } from "react"
import Music from "./Music"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { compose } from "redux"

const MusicContainer: FC = () => {
  return <Music />
}

export default compose<ComponentType>(withAuthRedirect, memo)(MusicContainer)
