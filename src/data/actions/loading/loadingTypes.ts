export const SERVER_LOADED = "SERVER_LOADED"
export const ADD_EVENT_POST = "ADD_EVENT_POST"
export const DELETE_EVENT_POST = "DELETE_EVENT_POST"

interface ServerLoadedAction {
   type: typeof SERVER_LOADED
}

export type LoadingType = ServerLoadedAction