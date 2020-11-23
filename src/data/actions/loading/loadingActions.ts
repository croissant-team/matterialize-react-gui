import { AppThunk } from "../../thunk"
import { SERVER_LOADED } from "./loadingTypes"

export const serverLoaded = () => ({
   type: SERVER_LOADED
})
