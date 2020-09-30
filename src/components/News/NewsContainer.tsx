import React, { FC } from "react"
import News from "./News"
import withAuthRedirect from "../../hoc/withAuthRedirect"

const NewsContainer: FC = () => {
  return <News />
}

export default withAuthRedirect(NewsContainer)
