import { createSelector } from "reselect"

export const getDialogsPage = (state) => {
  return state.dialogsPage
}

export const getUsers = createSelector(getDialogsPage, (dialogsPage) => {
  return dialogsPage.users
})

export const getMessages = createSelector(getDialogsPage, (dialogsPage) => {
  return dialogsPage.messages
})
