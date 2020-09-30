import React, { ComponentType, FC } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { actions } from "../../redux/dialogs-reducer"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { getDialogsPage } from "../../redux/selectors/dialogs-selectors"
import { AppStateType } from "../../redux/redux-store"
import Dialogs from "./Dialogs"

type MapStateProps = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
  addMessage: (message: string) => void
}

type OwnProps = {}

type Props = MapStateProps & MapDispatchProps & OwnProps

const DialogsContainer: FC<Props> = (props) => {
  return <Dialogs {...props} />
}

const mapStateToProps = (state: AppStateType) => ({
  dialogsPage: getDialogsPage(state),
})

export default compose<ComponentType<Props>>(
  connect<MapStateProps, MapDispatchProps, OwnProps, AppStateType>(
    mapStateToProps,
    { addMessage: actions.addMessage }
  ),
  withAuthRedirect
)(DialogsContainer)
