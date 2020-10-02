import { UserType } from "../types/types"
import usersReducer, { InitialStateType, actions } from "./users-reducer"

let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Vlad",
        status: "I love Marina <3",
        followed: false,
        photos: { small: null, large: null },
        uniqueUrlName: "//profile/foxy-fo",
      },
      {
        id: 1,
        name: "Marina",
        status: "I love my Vlad :3",
        followed: false,
        photos: { small: null, large: null },
        uniqueUrlName: "//profile/izomantra",
      },
      {
        id: 2,
        name: "Vlad 2",
        status: "I love Marina <3",
        followed: true,
        photos: { small: null, large: null },
        uniqueUrlName: "//profile/foxy-fo",
      },
      {
        id: 3,
        name: "Marina 2",
        status: "I love my Vlad :3",
        followed: true,
        photos: { small: null, large: null },
        uniqueUrlName: "//profile/izomantra",
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [], // array of users' ids
  }
})

test("follow success", () => {
  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})

test("toggle fetching should be true", () => {
  const newState = usersReducer(state, actions.toggleFetching(true))

  expect(newState.isFetching).toBeTruthy()
})

test("toggle fetching should be false", () => {
  const newState = usersReducer(state, actions.toggleFetching(false))

  expect(newState.isFetching).toBeFalsy()
})

test("setUsers success", () => {
  const users: UserType[] = [
    {
      id: 3,
      name: "Marina 2",
      status: "I love my Vlad :3",
      followed: true,
      photos: { small: null, large: null },
      uniqueUrlName: "//profile/izomantra",
    },
  ]
  const newState = usersReducer(state, actions.setUsers(users))

  expect(newState.users.length).toBe(1)
})

test("setTotleUsersCount success", () => {
  const value = 3
  const newState = usersReducer(state, actions.setTotalUsersCount(value))
  expect(newState.totalUsersCount).toBe(value)
})

test("setCurrentPage success", () => {
  const page = 2
  const newState = usersReducer(state, actions.setCurrentPage(page))
  expect(newState.currentPage).toBe(page)
})
