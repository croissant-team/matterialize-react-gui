import { AppThunk } from "../../thunk"
import { GET_CONFIG, MATTER_UPDATED, POST_CONFIG } from "./configTypes"

export const postConfig = (config: any): AppThunk => async dispatch => {
   fetch("http://localhost:9000/matter/config/update",{
      method: "POST",
      body: JSON.stringify(config)
   })
   .then(resp => resp.json())
}

export const getConfig = (): AppThunk => async dispatch => {
   fetch("http://localhost:9000/matters/config")
   .then(resp => resp.json())
   .then(config => dispatch({
      type: GET_CONFIG,
      payload: {
         config: config
      }
   }))
}


export const matterUpdated = (matter: string) => {
   return {
      type: MATTER_UPDATED,
      payload: {
         matter: matter
      }
   }
}