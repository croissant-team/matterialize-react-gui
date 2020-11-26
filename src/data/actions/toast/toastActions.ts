import { SHOW_TOAST, CLEAR_TOAST } from "./toastTypes";

export const showToast = (message: string, messageType: string) => ({
  type: SHOW_TOAST,
  message: message,
  messageType: messageType
})

export const clearToast = () => ({
  type: CLEAR_TOAST
})