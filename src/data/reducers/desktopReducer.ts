import { DesktopType, DESKTOP_SELECTED } from "../actions/desktop/desktopTypes"

type DesktopState = {
    desktop: string
}

const initialState: DesktopState = {
   desktop: ""
}


export function desktopReducer(state = initialState, action: DesktopType): DesktopState {
   switch (action.type) {
      case DESKTOP_SELECTED:
         return {
            ...state,
            desktop: action.payload.desktop
         }

      default:
         return state

   }
}