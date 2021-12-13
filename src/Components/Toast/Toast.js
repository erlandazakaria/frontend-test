import Snackbar from "@mui/material/Snackbar";

const Toast = ({isOpen, message, onClose}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={isOpen}
      autoHideDuration={2000}
      onClose={onClose}
      message={message}
    />
  );
}

export default Toast;
