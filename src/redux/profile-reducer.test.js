import profileReducer, { addPost } from "./profile-reducer"

let state = {
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
}

it("posts' length should be incremented", () => {
  // 1. start data
  let action = addPost("new post managed to be added")

  // 2. action
  let newState = profileReducer(state, action)

  // 3. expectation
  expect(newState.posts.length).toBe(3)
})

it("likes count should be equal to 0", () => {
  let action = addPost("test")

  let newState = profileReducer(state, action)

  expect(newState.posts[newState.posts.length - 1].likesCount).toBe(0)
})
