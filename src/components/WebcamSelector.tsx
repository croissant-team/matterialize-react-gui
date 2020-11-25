import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import { Device } from '../types'
import { showToast } from '../data/actions/toast/toastActions'

const BAD_REQUEST = 400
const CONFLICT = 409

const connector = connect(null, { showToast })

type PropsFromRedux = ConnectedProps<typeof connector>
type WebcamSelectorProps = PropsFromRedux

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const WebcamSelector: React.FC<WebcamSelectorProps> = (props) => {
  const classes = useStyles()
  const [deviceId, setDeviceId] = React.useState(-1)
  const [devices, setDevices] = React.useState<Device[]>([])

  const selectCamera = (devNum: number): void => {
    fetch('http://localhost:9000/camera/set', {
      method: 'POST',
      body: JSON.stringify({ dev_num: devNum }),
      })
    .then((res) => {
      if (res.ok) {
        setDeviceId(devNum)
      } else {
        res.text()
        .then(msg => props.showToast(msg, "error"))
      }
    })
    .catch(err => console.log(err))
  }

  React.useEffect(
    () => {
      fetch('http://localhost:9000/camera/options')
        .then(res => res.json())
        .then(data => {
          if (data.devices.length > 0) {
            fetch('http://localhost:9000/camera/current')
            .then(res => res.json())
            .then(data => {
              if (data.available) {
                setDeviceId(data.dev_num)
              } else {
                props.showToast("Current camera is being used by another application", "error")
              }
            })
          }
          setDevices(data.devices)
        })
    },
    [],
  )

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}
                   disabled={devices.length === 0}>
        <InputLabel id="webcam-select-label">Webcam</InputLabel>
        <Select
          labelId="webcam-select-label"
          id="webcam-select"
          value={deviceId}
          onChange={e => selectCamera(e.target.value as number)}
          label="Webcam"
        >
          {devices.length === 0 &&
          <MenuItem value={-1}>
            <em>No webcam available</em>
          </MenuItem>
          }

          {devices.map((device, key) => (
            <MenuItem key={key} value={device.dev_num}>
              {device.name || `Device ${device.dev_num}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default connector(WebcamSelector)