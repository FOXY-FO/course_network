const ADD_MESSAGE = "network/dialogs-reducer/ADD_MESSAGE"

let initialState = {
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
}

let dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      if (action.text === "" || typeof action.text !== "string") return

      let newMessage = {
        id: state.messages[state.messages.length - 1].id + 1,
        text: action.text,
      }

      return {
        ...state,
        messages: [...state.messages, newMessage],
      }
    default:
      return state
  }
}

export let addMessage = (text) => ({ type: ADD_MESSAGE, text })

export default dialogsReducer
