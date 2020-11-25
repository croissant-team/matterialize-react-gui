import { RECORDING_STARTED, RECORDING_STOPPED } from "./recordingTypes";

export const recordingStarted = () => ({
   type: RECORDING_STARTED
})

export const recordingStopped = () => ({
   type: RECORDING_STOPPED
})