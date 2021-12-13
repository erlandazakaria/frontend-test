import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import Routes from './Routes';
import Header from "../Components/Header";

const Layout = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className="container full-height" style={{padding: 0}}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <Routes />
        </main>
      </div>
    </Container>
  );
};

export default Layout;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(9),
    width: "100%",
  },
}));
