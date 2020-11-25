import { combineReducers } from "redux"
import { desktopReducer } from "./desktopReducer"
import { fileReducer } from "./fileReducer"
import { loadingReducer } from "./loadingReducer"

export const rootReducer = combineReducers({
    loadingReducer: loadingReducer,
    fileReducer: fileReducer,
    desktopReducer: desktopReducer
})

export type RootState = ReturnType<typeof rootReducer>