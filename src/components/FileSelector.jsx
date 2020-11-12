import React from "react";
import { Button } from '@material-ui/core';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

const FileSelector = () => {

  const imgInputRef = React.useRef(null);

  const handleChange = (path) => {
    fetch("http://localhost:9000/background/set/", {
      method: 'post',
      body: JSON.stringify({ content: path }),
      headers: { 'Content-Type': 'application/json' }
    })
  };


  return (
    <>
      <Button onClick={() => imgInputRef.current.click()} variant="contained" color="primary"><PanoramaOutlinedIcon />&nbsp; Select a background</Button>

      <input
        ref={imgInputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={e => handleChange(e.nativeEvent.target.files[0].path)}
      />
    </>
  );
};


export default FileSelector;