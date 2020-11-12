import React from "react";
import Webcam from "react-webcam";
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

const WebcamCapture = () => {
  const classes = useStyles();
  const [deviceId, setDeviceId] = React.useState(100);
  const [devices, setDevices] = React.useState([]);

  const setWebcam = (id, name) => {
    // setDeviceId(id);
  }

  const handleChange = (event) => {
    setWebcam(event.target.value);
  };

  const handleDevices = (deviceList) => {
    deviceList.forEach(element => {
      if (element.label === "Matterialize") {
        setDeviceId(element.deviceId);
      }
    });
  }

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  return (
    <>
      <Webcam width={640} height={480} mirrored audio={false} videoConstraints={{ deviceId: deviceId}} />
      <br />
      <br />
    </>
  );
};


export default WebcamCapture;