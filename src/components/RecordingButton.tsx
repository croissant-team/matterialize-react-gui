import React from 'react'
import { RootState } from '../data/reducers'
import { connect, ConnectedProps } from 'react-redux'
import { Button, Snackbar } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam';
import StopIcon from '@material-ui/icons/Stop';
import { recordingStarted, recordingStopped } from '../data/actions/recording/recordingActions'

const mapStateToProps = (state: RootState) => {
  return {
    recording: state.recordingReducer.recording
  }
}

const connector = connect(
  mapStateToProps,
  { recordingStarted, recordingStopped }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type RecordingButtonProps =  PropsFromRedux;

const RecordingButton: React.FC<RecordingButtonProps> = (props) => {

  const [showToast, setShowToast] = React.useState<boolean>(false);
  const [filePath, setFilePath] = React.useState<string>("");

  const toggleRecord = () => {
    if(props.recording) {
      
      fetch('http://localhost:9000/recording/stop', {
        method: 'POST'
      })
      .then(data => data.json())
      .then(resp => {
        setShowToast(true)
        props.recordingStopped()

        console.log(resp)

        return resp.path
      })
      .then(path => setFilePath(path))
      
    } else {
      fetch('http://localhost:9000/recording/start', {
        method: 'POST'
      })
      .then(() => props.recordingStarted())
      
    }
  }

  return (
    <>
      <Button variant="contained" color={props.recording ? "secondary" : "primary"} onClick={toggleRecord}>
        {props.recording ? <StopIcon /> : <VideocamIcon />} &nbsp;
        {props.recording ? "Stop recording" : "record"}
      </Button>

      <Snackbar 
        open={showToast} 
        autoHideDuration={6000} 
        onClose={() => setShowToast(false)} 
        message={"File saved to " + filePath} 
      />
    </>
  )
}

export default connector(RecordingButton)
