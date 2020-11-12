import React from "react";
import { Button } from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';

const CleanPlateCapture = () => {

  const handleChange = () => {
    fetch("http://localhost:9000/cleanplate/take")
  };


  return (
    <>
      <Button onClick={handleChange} variant="contained" color="primary"><CameraAltOutlinedIcon />&nbsp; Retake clean plate</Button>
    </>
  );
};


export default CleanPlateCapture;