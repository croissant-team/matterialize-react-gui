import React from 'react'
import Webcam from 'react-webcam'

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = React.useState(98)

  const handleDevices = (deviceList: MediaDeviceInfo[]): void => {
    deviceList.forEach(element => {
      console.log(element)
      if (element.label === 'preview_matterialize') {
        setDeviceId(parseInt(element.deviceId))
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
              videoConstraints={{ deviceId: deviceId.toString() }}/>
    </>
  )
}

export default WebcamCapture
