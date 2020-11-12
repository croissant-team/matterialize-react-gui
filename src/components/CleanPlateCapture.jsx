import React from "react";
import { Button } from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CleanPlateCapture = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const takeCleanPlate = () => {
    fetch("http://localhost:9000/cleanplate/take", {
      method : 'POST'
    })
    .then(res => setOpen(false))
    .catch(res => setOpen(false))
  };

  const handleChange = () => {
    setOpen(true);
    setTimeout(takeCleanPlate, 5000);
  };


  return (
    <>
      <Button onClick={handleChange} variant="contained" color="primary"><CameraAltOutlinedIcon />&nbsp; Retake clean plate</Button>
      <Dialog
        disableBackdropClick 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Retaking matter clean plate"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please step out of frame. You can enter the frame once this message dissapears.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};


export default CleanPlateCapture;