import React from 'react'
import { RootState } from '../data/reducers'
import { connect, ConnectedProps } from 'react-redux'
import { Chip, Slide, Zoom } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam';

const mapStateToProps = (state: RootState) => {
  return {
    recording: state.recordingReducer.recording
  }
}

const connector = connect(
  mapStateToProps,
  { }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type RecordingIndicatorProps =  PropsFromRedux;

const RecordingIndicator: React.FC<RecordingIndicatorProps> = (props) => {
  return (
    <>
      <div
        style={{
            position: 'absolute', left: '47%', right:'50%', top: '5%',
        }}
      >
        <Slide direction="down" in={props.recording}>
          <Chip
            icon={<VideocamIcon/>}
            label="Recording"
            color="secondary"
          />
        </Slide>
      </div>
    </>
  )
}

export default connector(RecordingIndicator)
