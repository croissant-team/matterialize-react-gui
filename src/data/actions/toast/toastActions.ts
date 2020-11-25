import { CAMERA_IN_USE, CLEAR_TOAST } from "./toastTypes";

export const cameraBeingUsed = (message: string, messageType: string) => ({
  type: CAMERA_IN_USE,
  message: message,
  messageType: messageType
})

export const clearToast = () => ({
  type: CLEAR_TOAST
})