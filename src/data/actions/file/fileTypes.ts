export const FILE_LOADED = "FILE_LOADED"

interface FileLoadedAction {
   type: typeof FILE_LOADED,
   payload: {
      path: string
   }
}

export type FileType = FileLoadedAction