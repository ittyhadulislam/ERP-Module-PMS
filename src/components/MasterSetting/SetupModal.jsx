import React from "react";
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  Modal,
  Typography,
  // makeStyles,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";

const SetupModal = ({ open, onClose, title, children, md = 8 }) => {
  // const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      // onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item xs={11} sm={9} md={md}>
          <Fade in={open}>
            <Box
              sx={{
                position: "relative",
                // width: "100%",
                // maxWidth: "90%",
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 10px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  // background: "#cac6cb",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    fontSize: "14px",
                  }}
                >
                  {title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    background: "transparent",
                    padding: "5px",
                    borderRadius: "50px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(255,255,255,1)",
                    },
                  }}
                >
                  <FaTimes fontSize={20} color="red" onClick={onClose} />
                </Box>
              </Box>
              <Box sx={{ padding: "10px" }}>{children}</Box>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SetupModal;
