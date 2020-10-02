import { ProfileType } from "../types/types"
import profileReducer, { actions, InitialStateType } from "./profile-reducer"

let state: InitialStateType

beforeEach(() => {
  state = {
    posts: [
      {
        id: 1,
        text: "Hey, what's up?!",
        likesCount: 13,
      },
      {
        id: 2,
        text: "What up!",
        likesCount: 1323,
      },
    ],
    profile: null,
    status: "",
    isProfileInfoEditModeOn: false,
  }
})

describe("addPost action", () => {
  it("posts' length should be incremented", () => {
    // 1. start data
    let action = actions.addPost("new post managed to be added")

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(3)
  })

  it("likes count should be equal to 0", () => {
    let action = actions.addPost("test")

    let newState = profileReducer(state, action)

    expect(newState.posts[newState.posts.length - 1].likesCount).toBe(0)
  })
})

describe("setProfile action", () => {
  test("profiel shouldn't be null", () => {
    let profile: ProfileType = {
      aboutMe: "front-end developer",
      contacts: {
        facebook: null,
        github: null,
        instagram: null,
        mainLink: null,
        twitter: null,
        vk: null,
        website: null,
        youtube: null,
      },
      fullName: "Vlad",
      lookingForAJob: true,
      lookingForAJobDescription: "React developer",
      photos: {
        large: null,
        small: null,
      },
      userId: 9375,
    }
    let action = actions.setProfile(profile)
    let newState = profileReducer(state, action)
    expect(newState.profile).not.toBeNull()
  })

  test("aboutMe should be correct", () => {
    let profile: ProfileType = {
      aboutMe: "front-end developer",
      contacts: {
        facebook: null,
        github: null,
        instagram: null,
        mainLink: null,
        twitter: null,
        vk: null,
        website: null,
        youtube: null,
      },
      fullName: "Vlad",
      lookingForAJob: true,
      lookingForAJobDescription: "React developer",
      photos: {
        large: null,
        small: null,
      },
      userId: 9375,
    }
    let action = actions.setProfile(profile)
    let newState = profileReducer(state, action)
    expect(newState.profile?.aboutMe).toBe("front-end developer")
  })

  test("fullName should be correct", () => {
    let profile: ProfileType = {
      aboutMe: "front-end developer",
      contacts: {
        facebook: null,
        github: null,
        instagram: null,
        mainLink: null,
        twitter: null,
        vk: null,
        website: null,
        youtube: null,
      },
      fullName: "Vlad",
      lookingForAJob: true,
      lookingForAJobDescription: "React developer",
      photos: {
        large: null,
        small: null,
      },
      userId: 9375,
    }
    let action = actions.setProfile(profile)
    let newState = profileReducer(state, action)
    expect(newState.profile?.fullName).toBe("Vlad")
  })
})
