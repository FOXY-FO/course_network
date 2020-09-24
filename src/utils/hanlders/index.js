import store from "../../redux/redux-store"
import { displayError } from "../../redux/error-reducer"

export const catchAllUnhandledErrors = (promiseRejectionEvent) => {
  store.dispatch(displayError(promiseRejectionEvent.reason.message))
}
