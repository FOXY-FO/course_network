import appReducer, { actions, InitialStateType } from "./app-reducer"

let state: InitialStateType = {
  initialized: false,
  globalError: null,
}

it("app should be initialized", () => {
  let action = actions.initializingSuccess()

  let newState = appReducer(state, action)

  expect(newState.initialized).toBe(true)
})
