export const GET_CONFIG = "GET_CONFIG"
export const IMPORT_CONFIG = "IMPORT_CONFIG"
export const EXPORT_CONFIG = "EXPORT_CONFIG"
export const POST_CONFIG = "POST_CONFIG"
export const MATTER_UPDATED = "MATTER_UPDATED"


interface GetConfigAction {
   type: typeof GET_CONFIG,
   payload: {
      config: any
   }
}

interface PostConfigAction {
   type: typeof GET_CONFIG,
   payload: {
      config: any
   }
}

interface MatterUpdatedAction {
   type: typeof MATTER_UPDATED,
   payload: {
      matter: string
   }
}

export type ConfigType = GetConfigAction | PostConfigAction | MatterUpdatedAction