import React from "react"
import Music from "./Music"
import withAuthRedirect from "../../hoc/withAuthRedirect"

const MusicContainer = (props) => {
  return <Music {...props} />
}

export default withAuthRedirect(MusicContainer)
