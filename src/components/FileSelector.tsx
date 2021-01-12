import React from 'react'
import { Button, Snackbar } from '@material-ui/core'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined'
import { RootState } from '../data/reducers'
import { connect, ConnectedProps } from 'react-redux'
import { fileLoaded } from '../data/actions/file/fileActions'
import { showToast } from '../data/actions/toast/toastActions'
import { setImageBackground, setVideoBackground } from '../endpoints'

const mapStateToProps = (state: RootState) => {
  return {
  }
}

const connector = connect(
  mapStateToProps,
  { fileLoaded, showToast }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type FileSelectorProps =  PropsFromRedux;

const FileSelector: React.FC<FileSelectorProps> = (props) => {
  const imgInputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (file: File): void => {
    const path = (file as any).path

    if (file.type.includes("video")) {
      fetch(setVideoBackground, {
        method: 'POST',
        body: JSON.stringify({ file_path: path }),
      })
      .then(res => props.fileLoaded(file))
    } else if (file.type.includes("image")) {  
      fetch(setImageBackground, {
        method: 'POST',
        body: JSON.stringify({ file_path: path }),
      })
      .then(res => props.fileLoaded(file))
    } else {
      props.showToast("The selected file is not an image or video.", "error")
    }

  }

  return (
    <>
      <Button onClick={() => imgInputRef.current?.click()} variant="contained"
              color="primary"><PanoramaOutlinedIcon/>&nbsp; Select a background</Button>

      <input
        ref={imgInputRef}
        hidden
        type="file"
        accept="image/* video/*"
        onChange={e => {
          handleChange(((e.nativeEvent.target as HTMLInputElement).files![0] as File))
        }}
      />
    </>
  )
}

export default connector(FileSelector)