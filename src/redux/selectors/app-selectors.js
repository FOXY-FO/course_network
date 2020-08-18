import { createSelector } from "reselect"

export const getApp = (state) => {
  return state.app
}

export const getInitialized = createSelector(getApp, (app) => {
  return app.initialized
})
