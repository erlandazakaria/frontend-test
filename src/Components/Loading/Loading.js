import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Loading = ({ isOpen=false, handleClick=()=>{} }) => {
  return (
    <Backdrop open={isOpen} onClick={handleClick} style={{position: "absolute", zIndex: 99999, width: "100vw", height: "100vh"}}>
      <Box className="flex-column" style={{ alignItems: "center", textAlign: "center"}}>
        <Typography color="primary" variant="h5" align="center" style={{marginBottom: 10}}>Loading</Typography>
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  );
}

export default Loading;
