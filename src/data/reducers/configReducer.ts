import { ConfigType, GET_CONFIG, MATTER_UPDATED } from "../actions/config/configTypes"

export type FieldInfo = {
   default_value: number,
   max: number,
   min: number,
   step_size: number
}

export type ConfigField = {
   name: string,
   value: any,
   field_info: FieldInfo
}

export type MatterConfig = {
   matter: string,
   fields: ConfigField[]
}

type ConfigState = {
   config: MatterConfig[],
   matter: string
}

const initialState: ConfigState = {
   config: [],
   matter: "None"
}


export function configReducer(state = initialState, action: ConfigType): ConfigState {
   switch (action.type) {
      case GET_CONFIG:
         return {
            ...state,
            config: action.payload.config
         }
      case MATTER_UPDATED:
         return {
            ...state,
            matter: action.payload.matter
         }

      default:
         return state

   }
}