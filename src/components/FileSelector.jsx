import React from "react";
import Webcam from "react-webcam";
import { InputLabel, Select, MenuItem, Button } from '@material-ui/core';

const FileSelector = () => {
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
      <Button variant="contained" color="primary">Select a background</Button>
    </>
  );
};


export default FileSelector;