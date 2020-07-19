import React from "react"
import News from "./News"
import withAuthRedirect from "../../hoc/withAuthRedirect"

class NewsContainer extends React.Component {
  render() {
    return <News {...this.props} />
  }
}

export default withAuthRedirect(NewsContainer)
