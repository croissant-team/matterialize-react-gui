import React from 'react'
import { Button } from '@material-ui/core'
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined'
import { clearBackground } from '../endpoints'

const ClearBackground: React.FC = () => {

  const handleChange = (): void => {
    fetch(clearBackground, {
      method: 'POST',
    })
  }

  return (
    <>
      <Button onClick={handleChange} variant="contained"
              color="secondary"><ClearOutlinedIcon/>&nbsp; Clear
        background</Button>
    </>
  )
}

export default ClearBackground