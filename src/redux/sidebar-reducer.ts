import { InferActionsTypes } from "./redux-store"

const initialState = {}

type InitialStateType = typeof initialState

const sidebarReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}

export const actions = {}

type ActionsTypes = InferActionsTypes<typeof actions>

export default sidebarReducer
