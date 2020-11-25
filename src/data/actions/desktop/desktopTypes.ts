export const DESKTOP_SELECTED = "DESKTOP_SELECTED"

interface DesktopSelectedAction {
   type: typeof DESKTOP_SELECTED,
   payload: {
      desktop: string
   }
}

export type DesktopType = DesktopSelectedAction