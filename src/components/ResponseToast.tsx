import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Alert, { Color } from '@material-ui/lab/Alert'
import { RootState } from "../data/reducers"
import { clearToast } from '../data/actions/toast/toastActions'
import { Snackbar } from '@material-ui/core'


const mapStateToProps = (state: RootState) => {
  return {
    message: state.toastReducer.message,
    messageType: state.toastReducer.messageType,
    active: state.toastReducer.active
  }
}

const connector = connect(mapStateToProps, { clearToast })

type PropsFromRedux = ConnectedProps<typeof connector>
type ResponseToastProps = PropsFromRedux

const ResponseToast: React.FC<ResponseToastProps> = (props) => {

  return (
    <>
      <Snackbar open={props.active} autoHideDuration={3000} onClose={() => clearToast}>
        <Alert variant="filled" severity={props.messageType as Color} elevation={6} onClose={() => clearToast}>{props.message}</Alert>
      </Snackbar>
    </>
  )
}

export default connector(ResponseToast)