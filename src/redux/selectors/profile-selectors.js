import { createSelector } from "reselect"

export const getProfilePage = (state) => {
  return state.profilePage
}

export const getPosts = createSelector(getProfilePage, (profilePage) => {
  return profilePage.posts
})

export const getProfile = createSelector(getProfilePage, (profilePage) => {
  return profilePage.profile
})

export const getStatus = createSelector(getProfilePage, (profilePage) => {
  return profilePage.status
})
