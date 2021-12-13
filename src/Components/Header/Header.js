import { useHistory } from "react-router-dom";
import { styled } from "@mui/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useAuth } from "../../Contexts/Auth"

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(
  ({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = () => {
  const { logout } = useAuth();
  const history = useHistory();
  return (
    <>
    <AppBar position="absolute" open={false}>
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          className="pointer"
          onClick={() => history.push("/")}
        >
          Glint Test
        </Typography>
        <IconButton onClick={() => logout()}>
          <ExitToAppIcon style={{color: "white"}} />
        </IconButton>
      </Toolbar>
    </AppBar>
    </>
  );
}

export default Header;
