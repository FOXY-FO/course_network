import { combineReducers, createStore, applyMiddleware, compose } from "redux"
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
