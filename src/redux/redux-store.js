import { combineReducers, createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import sidebarReducer from "./sidebar-reducer"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import appReducer from "./app-reducer"

let reducers = combineReducers({
  app: appReducer,
  sidebar: sidebarReducer,
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store
