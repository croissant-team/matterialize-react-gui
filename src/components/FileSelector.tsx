import React from 'react'
import { Button, Snackbar } from '@material-ui/core'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined'

const FileSelector: React.FC = () => {

  const imgInputRef = React.useRef<HTMLInputElement>(null)

  const [showErrorToast, setShowErrorToast] = React.useState<boolean>(false);

  const handleChange = (file: File): void => {
    const path = (file as any).path

    if (file.type.includes("video")) {
      console.log(file.type)
    } else if (file.type.includes("image")) {  
      fetch('http://localhost:9000/background/set', {
        method: 'POST',
        body: JSON.stringify({ file_path: path }),
      })
    } else {
      setShowErrorToast(true)
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


      <Snackbar 
        open={showErrorToast} 
        autoHideDuration={6000} 
        onClose={() => setShowErrorToast(false)} 
        message="The selected file is not an image or video." 
      />


    </>
  )
}

export default FileSelector