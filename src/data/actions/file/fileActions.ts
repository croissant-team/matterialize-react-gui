import { AppThunk } from "../../thunk"
import { FILE_LOADED } from "./fileTypes"

export const fileLoaded = (path: string) => ({
   type: FILE_LOADED,
   payload: {
      path: path
   }
})
