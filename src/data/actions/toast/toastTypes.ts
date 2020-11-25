export const CAMERA_IN_USE = "CAMERA_IN_USE"
export const CLEAR_TOAST = "CLEAR_TOAST"

interface CameraInUseAction {
  type: typeof CAMERA_IN_USE,
  message: string,
  messageType: string
}

interface ClearToastAction {
  type: typeof CLEAR_TOAST
}

export type ToastType = CameraInUseAction | ClearToastAction