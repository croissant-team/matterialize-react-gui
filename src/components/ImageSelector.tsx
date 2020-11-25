import React from 'react'
import { Button } from '@material-ui/core'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined'

const ImageSelector: React.FC = () => {

  const imgInputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (file: File): void => {
    const path = (file as any).path

    if (file.type.includes("video")) {
      console.log(file.type)
    } 

    if (file.type.includes("image")) {  
      fetch('http://localhost:9000/background/set', {
        method: 'POST',
        body: JSON.stringify({ file_path: path }),
      })
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

export default ImageSelector