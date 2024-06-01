import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({ open, setOpen, title = "", children }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      transitionDuration={800}
      maxWidth={"lg"}
      PaperProps={{
        style: {
          minWidth: "70%", // Set your desired minWidth here
        },
      }}
      // sx={{ border: "1px solid red" }}
      // sx={{ position: 'relative' }}
    >
      <Grid
        container
        alignItems={"center"}
        height={50}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          textAlign={"start"}
          sx={{ padding: "10px 25px" }}
          variant="h5"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {title}
        </DialogTitle>

        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 5, right: 12 }}
        >
          <CloseIcon color="error" />
        </IconButton>
      </Grid>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomModal;
