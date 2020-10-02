import { APIResponseType, GetItemsType, ResultCodesEnum } from "../api/api"
import { usersAPI } from "../api/users-api"
import {
  followUserThunkCreator as follow,
  getUsersThunkCreator as getUsers,
  unfollowUserThunkCreator as unfollow,
  actions,
} from "./users-reducer"
jest.mock("../api/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
  fieldsErrors: [],
}
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

const getUsersResponse: GetItemsType = {
  items: [],
  totalCount: 0,
  error: null,
}
usersAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResponse))

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  usersAPIMock.follow.mockClear()
  usersAPIMock.unfollow.mockClear()
  usersAPIMock.getUsers.mockClear()
})

test("follow thunk success", async () => {
  const userId = 1
  const thunk = follow(userId)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingInProgress(userId)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(userId))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingInProgress(userId)
  )
})

test("getUsers thunk success", async () => {
  const currentPage = 1
  const pageSize = 10

  const thunk = getUsers(currentPage, pageSize)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(5)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFetching(true))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    2,
    actions.setUsers(getUsersResponse.items!)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.setTotalUsersCount(getUsersResponse.totalCount)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    4,
    actions.setCurrentPage(currentPage)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.toggleFetching(false))
})

test("unfollow thunk success", async () => {
  const userId = 2
  const thunk = unfollow(userId)

  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingInProgress(userId)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    2,
    actions.unfollowSuccess(userId)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingInProgress(userId)
  )
})
