import { ConfigType, GET_CONFIG, MATTER_UPDATED } from "../actions/config/configTypes"


type ConfigState = {
    config: any,
    matter: string
}

const initialState: ConfigState = {
   config: {},
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