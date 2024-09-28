import { useSelector } from "react-redux";
import { selectEditIsOpen } from "../../redux/contacts/selectors";
import {
  Backdrop,
  Fade,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import css from "./EditModal.module.css";

export default function EditModal() {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const isOpen = useSelector(selectEditIsOpen);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgba(212, 231, 255, 0.7)",
    borderRadius: 2,
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Edit your contact:
            </Typography>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              sx={{
                width: "100%",
                margin: "16px 0",
              }}
            />
            <TextField
              variant="outlined"
              label="Number"
              name="number"
              sx={{ width: "100%", marginBottom: "16px" }}
            />
            <div className={css.btnWrap}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(65, 116, 177, 0.7)",
                  width: "100px",
                }}
              >
                Save
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(65, 116, 177, 0.7)",
                  width: "100px",
                }}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
