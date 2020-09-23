import React from "react"
import News from "./News"
import withAuthRedirect from "../../hoc/withAuthRedirect"

const NewsContainer = (props) => {
  return <News {...props} />
}

export default withAuthRedirect(NewsContainer)
