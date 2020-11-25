export const RECORDING_STARTED = "RECORDING_STARTED"
export const RECORDING_STOPPED = "RECORDING_STOPPED"

interface RecordingStartedAction {
   type: typeof RECORDING_STARTED
}

interface RecordingStoppedAction {
   type: typeof RECORDING_STOPPED
}

export type RecordingType = RecordingStartedAction | RecordingStoppedAction