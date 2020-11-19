import { LoadingType, SERVER_LOADED } from "../actions/loading/loadingTypes"

type LoadingState = {
    loading: boolean
}

const initialState: LoadingState = {
   loading: true
}

export function loadingReducer(state = initialState, action: LoadingType): LoadingState {
   switch (action.type) {
      case SERVER_LOADED:
         return {
            ...state,
            loading : false
         }

      default:
         return state

   }
}