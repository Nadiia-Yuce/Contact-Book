import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Fade, Modal, Box, Typography, Button } from "@mui/material";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import {
  selectCurrentContact,
  selectDeleteIsOpen,
} from "../../redux/contacts/selectors";
import {
  closeDeleteModal,
  setCurrentContact,
} from "../../redux/contacts/slice";

export default function DeleteModal({ onRemove }) {
  const isOpen = useSelector(selectDeleteIsOpen);
  const currentContact = useSelector(selectCurrentContact);
  const dispatch = useDispatch();

  const handleDelete = () => {
    onRemove(currentContact.id);

    setTimeout(() => {
      dispatch(deleteContact(currentContact.id));
      dispatch(closeDeleteModal());
      toast.success("Contact deleted!");
    }, 1000);
  };

  const handleCancel = () => {
    dispatch(closeDeleteModal());
    dispatch(setCurrentContact(null));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "300px", sm: "400px" },
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
        onClose={handleCancel}
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
              {`Are you sure you want to delete "${
                currentContact?.name || "this contact"
              }" ?`}
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "16px",
              }}
            >
              <Button
                type="button"
                onClick={handleDelete}
                variant="contained"
                sx={{
                  backgroundColor: "var(--btn)",
                  width: "100px",
                }}
              >
                Yes
              </Button>

              <Button
                type="button"
                onClick={handleCancel}
                variant="contained"
                sx={{
                  backgroundColor: "var(--btn)",
                  width: "100px",
                }}
              >
                No
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
