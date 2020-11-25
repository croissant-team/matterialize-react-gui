import { FileType, FILE_LOADED } from "../actions/file/fileTypes"



export const noFile: string = "No file selected"

type FileState = {
    path: string
}

const initialState: FileState = {
   path: noFile
}


export function fileReducer(state = initialState, action: FileType): FileState {
   switch (action.type) {
      case FILE_LOADED:
         return {
            ...state,
            path: action.payload.path
         }

      default:
         return state

   }
}