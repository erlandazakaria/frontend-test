import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import md5 from "md5";

import { useAuth } from "../../Contexts/Auth";
import { useLoading } from "../../Contexts/Loading";
import { useToast } from "../../Contexts/Toast";

// import Logo from "../../Assets/logo-white.jpg";
import { loginSchema } from "./schema";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login } = useAuth();
  const { openLoading, closeLoading } = useLoading();
  const { openToast } = useToast();
  const { handleSubmit, control, formState:{ errors }, setError } = useForm({ resolver: loginSchema });

  const onLogin = async (data) => {
    openLoading(true)
    const res = await login({email: data.email, password: md5(data.password)});
    
    if(res.error) {
      switch(true) {
        case res.msg.includes("Email"):
          setError("email", {type: "manual", name: "email", message: res.msg});
          break;
        case res.msg.includes("Password"):
          setError("password", {type: "manual", name: "password", message: res.msg});
          break;
        default:
          setError("email", {type: "manual", name: "email", message: "Error Occurred!"});
          setError("password", {type: "manual", name: "password", message: "Error Occurred!"});
          break;
      }
    } else {
      openToast("Successfully Login");
      history.replace(`/`);
    }
    closeLoading();
  };

  return (
    <Container maxWidth={false} className="container">
      <Grid container direction="column" justify="center" alignItems="center" className="container">
        {/* <img alt="logo" src={Logo} className={classes.logo} /> */}
        <Typography variant="h5" style={{marginBottom: 20}}>Login Page</Typography>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
          <TextField 
            label="Email" 
            variant="outlined" 
            placeholder="Email" 
            color="primary" 
            margin="dense"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...field}
          />)}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
          <TextField 
            label="Password" 
            variant="outlined" 
            placeholder="Password" 
            color="primary" 
            margin="dense"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...field}
          />)}
          />
        <Box className="flex-row">
          <Button
            style={{marginLeft: 10}}
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={handleSubmit(onLogin)}
          >Login</Button>
        </Box>
        
        <Box className="flex-column" marginTop={4}>
          <Typography variant="body2">Guest User: guest@a.com</Typography>
          <Typography variant="body2">Guest Pass: guest123</Typography>
        </Box>
      </Grid>
    </Container>
  );
}

export default Login;

const useStyles = makeStyles(() => ({
  logo: {
    height: "150px"
  },
  btn: {
    height: "30px", 
    width: "110px", 
    marginTop: "10px"
  },
  forget: {
    marginTop: 5,
    width: "220px"
  }
}));
