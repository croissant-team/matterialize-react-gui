import { AppThunk } from "../../thunk"
import { cameraLoaded } from "../loading/loadingActions"
import { GET_CONFIG, MATTER_UPDATED } from "./configTypes"

export const postConfig = (matter: string, config: any): AppThunk => async dispatch => {
   fetch("http://localhost:9000/matter/config/update",{
      method: "POST",
      body: JSON.stringify({
         matter: matter,
         config: config
      })
   })
   .then(() => dispatch(getConfig()))
   .then(() => dispatch(cameraLoaded()))
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