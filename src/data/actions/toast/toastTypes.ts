export const SHOW_TOAST = "SHOW_TOAST"
export const CLEAR_TOAST = "CLEAR_TOAST"

interface CameraInUseAction {
  type: typeof SHOW_TOAST,
  message: string,
  messageType: string
}

interface ClearToastAction {
  type: typeof CLEAR_TOAST
}

export type ToastType = CameraInUseAction | ClearToastAction