import * as axios from "axios"

let instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "b6edddc9-bab3-4de4-ba5b-f431953c39b4",
  },
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`/users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data)
  },
  follow(userId) {
    return instance.post(`/follow/${userId}`).then((res) => res.data)
  },

  unfollow(userId) {
    return instance.delete(`/follow/${userId}`).then((res) => res.data)
  },
}

export const profileAPI = {
  getProfile(id) {
    return instance.get(`/profile/${id}`).then((res) => res.data)
  },
  getUserStatus(userId) {
    return instance.get(`/profile/status/${userId}`).then((res) => res.data)
  },
  updateUserStatus(status) {
    return instance.put("/profile/status", { status }).then((res) => res.data)
  },
  uploadPhoto(image) {
    let formData = new FormData()
    formData.append("image", image)
    return instance.put("/profile/photo", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
  },
  updateProfileInfo(info) {
    return instance.put("/profile", info)
  },
}

export const authAPI = {
  getCurrentUserProfile() {
    return instance.get(`/auth/me`).then((res) => res.data)
  },

  login(email, password, rememberMe = false, captcha = "") {
    return instance
      .post("/auth/login", { email, password, rememberMe, captcha })
      .then((res) => res.data)
  },

  logout() {
    return instance.delete("/auth/login").then((res) => res.data)
  },
}

export const securityAPI = {
  getCaptchaURL() {
    return instance.get("/security/get-captcha-url")
  },
}
