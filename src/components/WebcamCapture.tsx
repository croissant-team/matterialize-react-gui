import React from 'react'
import Webcam from 'react-webcam'

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = React.useState<string>()

  const handleDevices = (deviceList: MediaDeviceInfo[]): void => {
    deviceList.forEach(element => {
      console.log(element)
      if (element.label === 'preview_matterialize') {
        setDeviceId(element.deviceId)
      }
    })
  }

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices)
    },
    [handleDevices],
  )

  return (
    <>
      <Webcam width={640} height={480} mirrored audio={false}
              videoConstraints={{ deviceId: deviceId }}/>
    </>
  )
}

export default WebcamCapture
