import { FILE_LOADED } from "./fileTypes"

export const fileLoaded = (file: File) => ({
   type: FILE_LOADED,
   payload: {
      file: file
   }
})
