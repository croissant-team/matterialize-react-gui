export const FILE_LOADED = "FILE_LOADED"

interface FileLoadedAction {
   type: typeof FILE_LOADED,
   payload: {
      file: File
   }
}

export type FileType = FileLoadedAction