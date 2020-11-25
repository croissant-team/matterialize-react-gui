import { SHOW_TOAST, CLEAR_TOAST, ToastType } from "../actions/toast/toastTypes"

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
    case SHOW_TOAST:
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