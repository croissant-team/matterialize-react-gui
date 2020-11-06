import React from "react";
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const WebcamSelector = () => {
  const classes = useStyles();
  const [deviceId, setDeviceId] = React.useState(0);
  const [devices, setDevices] = React.useState([]);

  const setWebcam = (id, name) => {
    setDeviceId(id);
  }

  const handleChange = (event) => {
    setWebcam(event.target.value);
  };

  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="webcam-select-label">Webcam</InputLabel>
        <Select
          labelId="webcam-select-label"
          id="webcam-select"
          value={deviceId}
          onChange={handleChange}
          label="Webcam"
        >
          <MenuItem value={0}>
            <em>Default webcam</em>
          </MenuItem>
          {devices.map((device, key) => (
            <MenuItem value={device.deviceId}>{device.label || `Device ${key + 1}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};


export default WebcamSelector;