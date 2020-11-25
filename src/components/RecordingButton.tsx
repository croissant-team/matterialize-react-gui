import React from 'react'
import { RootState } from '../data/reducers'
import { connect, ConnectedProps } from 'react-redux'
import { Button } from '@material-ui/core'
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

  const toggleRecord = () => {
    if(props.recording) {
      props.recordingStopped()
    } else {
      props.recordingStarted()
    }
  }

  return (
    <>
      <Button variant="contained" color={props.recording ? "secondary" : "primary"} onClick={toggleRecord}>
        {props.recording ? <StopIcon /> : <VideocamIcon />} &nbsp;
        {props.recording ? "Stop recording" : "record"}
      </Button>
    </>
  )
}

export default connector(RecordingButton)
