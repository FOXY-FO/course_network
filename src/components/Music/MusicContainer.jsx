import React, { memo } from "react"
import Music from "./Music"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { compose } from "redux"

const MusicContainer = (props) => {
  return <Music {...props} />
}

export default compose(withAuthRedirect, memo)(MusicContainer)
