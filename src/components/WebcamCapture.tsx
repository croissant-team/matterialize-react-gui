import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Webcam from 'react-webcam'
import { RootState } from '../data/reducers'

const mapStateToProps = (state: RootState) => {
  return {
    cameraLoading: state.loadingReducer.cameraLoading
  }
}

const connector = connect(
  mapStateToProps,
  {  }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type WebcamCaptureProps =  PropsFromRedux;

const WebcamCapture: React.FC<WebcamCaptureProps> = (props) => {
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

      {props.cameraLoading && 
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        >
          <CircularProgress />
        </div>}
    </>
  )
}

export default connector(WebcamCapture)
