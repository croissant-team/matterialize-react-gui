import { DESKTOP_SELECTED } from "./desktopTypes"

export const desktopLoaded = (desktop: string) => ({
   type: DESKTOP_SELECTED,
   payload: {
      desktop: desktop
   }
})
