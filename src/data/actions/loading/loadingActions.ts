import { AppThunk } from "../../thunk"
import { CAMERA_LOADED, CAMERA_LOADING, SERVER_LOADED } from "./loadingTypes"

export const serverLoaded = () => ({
   type: SERVER_LOADED
})

export const cameraLoaded = () => ({
   type: CAMERA_LOADED
})

export const cameraLoading = () => ({
   type: CAMERA_LOADING
})
