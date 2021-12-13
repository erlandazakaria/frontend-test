import { useState } from "react";

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const RenameCollection = ({modal, setModal, handler}) => {
  const [ text, setText ] = useState("");

  const onClose = () => {
    setModal(null)
  }

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      style={{position: "absolute", height: '100vh', width: '100vw', top: 0, left: 0}}
      open={true}
      onClick={() => {}}
    >
      <Box 
        style={{width: 500, height: 150, padding: 20, backgroundColor: "white", position: "relative"}} 
        sx={{zIndex: (theme) => theme.zIndex.drawer + 2}}
      >
        <Box 
          style={{width: 20, height: 20, position: "absolute", right: 10, top: 5, color: "black"}}
          onClick={onClose}
        >
          <CancelPresentationIcon />
        </Box>
        <Typography variant="body1" color="primary">Rename Collection</Typography>
        <Divider style={{marginBottom: 16, marginTop: 8}} />
        <Box display="flex" flexDirection="row" justifyContent="center" marginTop={4}>
          <TextField size="small" value={text} onChange={e => setText(e.target.value)} />
          <Button
            variant="contained" 
            color="secondary" 
            size="small" 
            onClick={() => {handler(modal, text); onClose()}}
          >Rename</Button>
        </Box>
      </Box>
    </Backdrop>
  );
}

export default RenameCollection;
