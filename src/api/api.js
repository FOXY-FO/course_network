import * as axios from "axios"

let instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "6250ef7b-bad9-421f-a376-067418d16b3b",
  },
})

export default {
  users: {
    getUsers(pageSize = 10, currentPage = 1) {
      return instance
        .get(`/users?page=${currentPage}&count=${pageSize}`)
        .then((res) => res.data)
    },
  },

  profile: {
    getProfile(id) {
      return instance.get(`/profile/${id}`).then((res) => res.data)
    },
  },

  auth: {
    getCurrentUserProfile() {
      return instance.get(`/auth/me`).then((res) => res.data)
    },
  },

  follow: {
    follow(userId) {
      return instance.post(`/follow/${userId}`).then((res) => res.data)
    },

    unfollow(userId) {
      return instance.delete(`/follow/${userId}`).then((res) => res.data)
    },
  },
}
