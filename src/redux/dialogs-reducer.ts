const ADD_MESSAGE = "network/dialogs-reducer/ADD_MESSAGE"

type MessageType = {
  id: number
  text: string
}
type UserType = {
  id: number
  name: string
}
// type InitialStateType = {
//   users: UserType[]
//   messages: MessageType[]
// }
const initialState = {
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
  ] as Array<UserType>,
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
  ] as Array<MessageType>,
}

type InitialStateType = typeof initialState

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      if (action.text === "") return state

      const newMessage = {
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

type AddMessageActionType = {
  type: typeof ADD_MESSAGE
  text: string
}
export const addMessage = (text: string): AddMessageActionType => ({
  type: ADD_MESSAGE,
  text,
})

export default dialogsReducer
