import React from "react";
import Webcam from "react-webcam";
import { InputLabel, Select, MenuItem } from '@material-ui/core';

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = React.useState({});
  // const [deviceName, setDeviceName] = React.useState("Select a webcam");
  const [devices, setDevices] = React.useState([]);

  const setWebcam = (id, name) => {
    setDeviceId(id);
    // setDeviceName(name);
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
      <Webcam width={640} height={480} mirrored audio={false} videoConstraints={{ deviceId: deviceId}} />

      <InputLabel color="primary" id="label">Select a webcam</InputLabel>
      <Select labelId="label" id="select" value={deviceId} onChange={handleChange}>
        {devices.map((device, key) => (
          <MenuItem value={device.deviceId}>{device.label || `Device ${key + 1}`}</MenuItem>
        ))}
      </Select>
    </>
  );
};


export default WebcamCapture;