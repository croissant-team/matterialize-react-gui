import { RecordingType, RECORDING_STARTED, RECORDING_STOPPED } from "../actions/recording/recordingTypes"


type RecordingState = {
    recording: boolean
}

const initialState: RecordingState = {
   recording: false
}


export function recordingReducer(state = initialState, action: RecordingType): RecordingState {
   switch (action.type) {
      case RECORDING_STARTED:
         return {
            ...state,
            recording: true
         }
      case RECORDING_STOPPED:
         return {
            ...state,
            recording: false
         }

      default:
         return state

   }
}