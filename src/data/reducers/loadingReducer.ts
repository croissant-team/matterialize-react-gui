import { CAMERA_LOADING, LoadingType, SERVER_LOADED, CAMERA_LOADED } from "../actions/loading/loadingTypes"

type LoadingState = {
    loading: boolean,
    cameraLoading: boolean
}

const initialState: LoadingState = {
   loading: true,
   cameraLoading: false
}

export function loadingReducer(state = initialState, action: LoadingType): LoadingState {
   switch (action.type) {
      case SERVER_LOADED:
         return {
            ...state,
            loading : false
         }
      case CAMERA_LOADING:
         return {
            ...state,
            cameraLoading : true
         }
      case CAMERA_LOADED:
         return {
            ...state,
            cameraLoading : false
         }

      default:
         return state

   }
}