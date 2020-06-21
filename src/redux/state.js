let store = {
  _state: {
    profilePage: {
      newPostText: "",
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
    },

    dialogsPage: {
      users: [
        {
          id: 1,
          name: "Vlad",
        },
        {
          id: 2,
          name: "Alina",
        },
        {
          id: 3,
          name: "Liza",
        },
      ],
      messages: [
        {
          id: 1,
          text: "Hi",
        },
        {
          id: 2,
          text: "How are you?",
        },
        {
          id: 3,
          text: "I'm fine, thank you",
        },
      ],
    },
  },

  getState() {
    return this._state
  },
  _callSubscriber() {
    console.log("state was changed")
  },
  addPost(postContent) {
    const newPost = {
      id: this._state.profilePage.posts[this._state.profilePage.posts.length - 1].id + 1,
      text: postContent,
      likesCount: 0,
    }
    this._state.profilePage.posts.push(newPost)
    this._state.profilePage.newPostText = ""
    this._callSubscriber(this._state)
  },
  changeNewPostText(text) {
    this._state.profilePage.newPostText = text
    this._callSubscriber(this._state)
  },
  subscribe(observer) {
    this._callSubscriber = observer
  }
}

export default store
