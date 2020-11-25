import { CAMERA_IN_USE, CLEAR_TOAST, ToastType } from "../actions/toast/toastTypes"

type ToastState = {
  message: string,
  messageType: string,
  active: boolean
}

const initialState: ToastState = {
  message: "",
  messageType: "",
  active: false
}

export function toastReducer(state = initialState, action: ToastType): ToastState {
  switch (action.type) {
    case CAMERA_IN_USE:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
        active: true
      }
    case CLEAR_TOAST:
      return {
        ...state,
        active: false
      }
    default:
      return state
  }
}