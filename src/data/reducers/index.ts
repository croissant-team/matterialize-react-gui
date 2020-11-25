import { combineReducers } from "redux"
import { fileReducer } from "./fileReducer"
import { loadingReducer } from "./loadingReducer"

export const rootReducer = combineReducers({
    loadingReducer: loadingReducer,
    fileReducer: fileReducer
})

export type RootState = ReturnType<typeof rootReducer>