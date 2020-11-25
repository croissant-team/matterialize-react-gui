import React from 'react'
import { Button } from '@material-ui/core'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined'

const ImageSelector: React.FC = () => {

  const imgInputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (path: string): void => {
    fetch('http://localhost:9000/background/set', {
      method: 'POST',
      body: JSON.stringify({ file_path: path }),
    })
  }

  return (
    <>
      <Button onClick={() => imgInputRef.current?.click()} variant="contained"
              color="primary"><PanoramaOutlinedIcon/>&nbsp; Select a background</Button>

      <input
        ref={imgInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={e => {
          handleChange(((e.nativeEvent.target as HTMLInputElement).files![0] as any).path)
        }}
      />
    </>
  )
}

export default ImageSelector