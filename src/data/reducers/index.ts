import { combineReducers } from "redux"
import { loadingReducer } from "./loadingReducer"

export const rootReducer = combineReducers({
    loadingReducer: loadingReducer
})

export type RootState = ReturnType<typeof rootReducer>