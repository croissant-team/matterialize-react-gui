export const SERVER_LOADED = "SERVER_LOADED"

export const CAMERA_LOADING = "CAMERA_LOADING"
export const CAMERA_LOADED = "CAMERA_LOADED"

interface ServerLoadedAction {
   type: typeof SERVER_LOADED
}

interface CameraLoadingAction {
   type: typeof CAMERA_LOADING
}

interface CameraLoadedAction {
   type: typeof CAMERA_LOADED
}

export type LoadingType = ServerLoadedAction | CameraLoadingAction | CameraLoadedAction