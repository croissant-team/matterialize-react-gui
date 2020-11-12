import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = React.useState(100);

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
    </>
  );
};


export default WebcamCapture;