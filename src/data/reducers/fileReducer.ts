import { FileType, FILE_LOADED } from "../actions/file/fileTypes"



export const noFile: string = "No file selected"

type FileState = {
    file: File | undefined
}

const initialState: FileState = {
   file: undefined
}


export function fileReducer(state = initialState, action: FileType): FileState {
   switch (action.type) {
      case FILE_LOADED:
         return {
            ...state,
            file: action.payload.file
         }

      default:
         return state

   }
}