import appReducer, { initializingSuccess } from "./app-reducer"

let state = {
  initialized: false,
}

it("app should be initialized", () => {
  let action = initializingSuccess()

  let newState = appReducer(state, action)

  expect(newState.initialized).toBe(true)
})
