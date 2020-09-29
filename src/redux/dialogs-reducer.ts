import { InferActionsTypes } from "./redux-store"

type MessageType = {
  id: number
  text: string
}
type UserType = {
  id: number
  name: string
}
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
  ] as UserType[],
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
  ] as MessageType[],
}

const dialogsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "dialogs/ADD_MESSAGE":
      if (action.text === "") return state

      const newMessage: MessageType = {
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

export const actions = {
  addMessage: (text: string) =>
    ({
      type: "dialogs/ADD_MESSAGE",
      text,
    } as const),
}

export default dialogsReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
