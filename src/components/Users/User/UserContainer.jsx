import React from "react"
import * as axios from "axios"
import User from "./User"

class UserContainer extends React.Component {
  follow = (userId) => {
    axios
      .post(
        `https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
        {},
        {
          withCredentials: true,
          headers: {
            "API-KEY": "6250ef7b-bad9-421f-a376-067418d16b3b",
          },
        }
      )
      .then((res) => {
        if (res.data.resultCode === 0) {
          this.props.follow(userId)
        }
      })
  }

  unfollow = (userId) => {
    axios
      .delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
        withCredentials: true,
        headers: {
          "API-KEY": "6250ef7b-bad9-421f-a376-067418d16b3b",
        },
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          this.props.unfollow(userId)
        }
      })
  }

  render() {
    return (
      <User {...this.props} follow={this.follow} unfollow={this.unfollow} />
    )
  }
}

export default UserContainer
