import { AppThunk } from "../../thunk"
import { cameraLoaded } from "../loading/loadingActions"
import { GET_CONFIG, MATTER_UPDATED } from "./configTypes"
import { showToast } from '../toast/toastActions'
import { ConfigField, MatterConfig } from '../../reducers/configReducer'
import { exportMatterConfigs, getMatterConfigs, importMatterConfigs, updateMatterConfig } from "../../../endpoints"

export const postConfig = (matter: string, config: any): AppThunk => async dispatch => {
   fetch(updateMatterConfig,{
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
   fetch(getMatterConfigs)
   .then(resp => resp.json())
   .then(raw => {
      console.log(Object.keys(raw));
      var configs: MatterConfig[] = []

      Object.keys(raw).forEach(matter_name => {
         var config_fields: ConfigField[] = []

         console.log(raw[matter_name])
         console.log(matter_name)

         if (raw[matter_name] !== null) {
            Object.keys(raw[matter_name]).forEach(field_name => {
               var raw_field = raw[matter_name][field_name]
               config_fields.push({
                  name: field_name,
                  value: raw_field.value,
                  field_info: {
                     default_value: raw_field.field_info.default_value,
                     max: raw_field.field_info.max,
                     min: raw_field.field_info.min,
                     step_size: raw_field.field_info.step_size,
                     display_name: raw_field.field_info.display_name
                  }
               })
            })
         }


         configs.push({
            matter: matter_name,
            fields: config_fields
         })
      })

      return configs
   })
   .then(config => dispatch({
      type: GET_CONFIG,
      payload: {
         config: config
      }
   }))
}

export const importConfig = (): AppThunk => async dispatch => {
   fetch(importMatterConfigs, {
      method: "POST"
   })
   .then(() => dispatch(getConfig()))
   .then(() => dispatch(cameraLoaded()))
   .then(() => dispatch(showToast("Config imported", "success")))
   .catch(() => dispatch(showToast("Error importing config", "error")))
}

export const exportConfig = (): AppThunk => async dispatch => {
   fetch(exportMatterConfigs, {
      method: "POST"
   })
   .then(() => dispatch(showToast("Succesfully exported config", "success")))
   .catch(() => dispatch(showToast("Error exporting config", "error")))
}

export const matterUpdated = (matter: string) => {
   return {
      type: MATTER_UPDATED,
      payload: {
         matter: matter
      }
   }
}