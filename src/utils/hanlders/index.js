import store from "../../redux/redux-store"
import { displayError } from "../../redux/app-reducer"

export const catchAllUnhandledErrors = (promiseRejectionEvent) => {
  store.dispatch(displayError(promiseRejectionEvent.reason.message))
}
