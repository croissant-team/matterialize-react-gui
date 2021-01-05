import { AppThunk } from "../../thunk"
import { cameraLoaded } from "../loading/loadingActions"
import { GET_CONFIG, MATTER_UPDATED } from "./configTypes"
import { showToast } from '../toast/toastActions'
import { FieldInfo, ConfigField, MatterConfig } from '../../reducers/configReducer'

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
   .then(raw => {
      var configs: MatterConfig[] = []

      for (var matter_name in Object.keys(raw)) {
         var config_fields: ConfigField[] = []

         for (var field_name in Object.keys(raw[matter_name])) {
            var raw_field = raw[matter_name][field_name]
            config_fields.push({
               name: field_name,
               value: raw_field.value,
               field_info: {
                  default_value: raw_field.field_info.default_value,
                  max: raw_field.field_info.max,
                  min: raw_field.field_info.min,
                  step_size: raw_field.field_info.step_size
               }
            })
         }

         configs.push({
            matter: matter_name,
            fields: config_fields
         })
      }

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
   fetch("http://localhost:9000/matters/config/import_file", {
      method: "POST"
   })
   .then(() => dispatch(getConfig()))
   .then(() => dispatch(cameraLoaded()))
   .then(() => dispatch(showToast("Config imported", "success")))
   .catch(() => dispatch(showToast("Error importing config", "error")))
}

export const exportConfig = (): AppThunk => async dispatch => {
   fetch("http://localhost:9000/matters/config/export_file", {
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