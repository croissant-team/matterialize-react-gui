import { combineReducers } from "redux"
import { desktopReducer } from "./desktopReducer"
import { fileReducer } from "./fileReducer"
import { loadingReducer } from "./loadingReducer"
import { recordingReducer } from "./recordingReducer"

export const rootReducer = combineReducers({
    loadingReducer: loadingReducer,
    fileReducer: fileReducer,
    desktopReducer: desktopReducer,
    recordingReducer: recordingReducer
})

export type RootState = ReturnType<typeof rootReducer>