import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FirstLoading = () => {
  return (
    <div className="fluid-container">
      <Backdrop open={true} onClick={() => {}}>
        <Box className="flex-column" style={{ alignItems: "center", textAlign: "center"}}>
          <Typography color="primary" variant="h5" align="center" style={{marginBottom: 10}}>Loading</Typography>
          <CircularProgress color="primary" />
        </Box>
      </Backdrop>
    </div>
  );
}

export default FirstLoading;
