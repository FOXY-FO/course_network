import authReducer, { actions, InitialStateType } from "./auth-reducer"

let state: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
}
let action = actions.setUserData(25, "foxyfo1703@gmail.com", "foxy_fo", true)
let newState = authReducer(state, action)

it("id should equal to 25", () => {
  expect(newState.userId).toBe(25)
})

it("email should equal to foxyfo1703@gmail.com", () => {
  expect(newState.email).toBe("foxyfo1703@gmail.com")
})

it("login should equal to foxy_fo", () => {
  expect(newState.login).toBe("foxy_fo")
})

it("user is supposed to be authorized", () => {
  expect(newState.isAuth).toBe(true)
})
