import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_ALLFOOD, GET_USERS } from './queries';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function SignIn({ setIsLogIn }, props) {
  const navigate = useNavigate();
  const [isUser, setIsUser] = React.useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = React.useState({})
  const [showPassword, setShowPassword] = React.useState(false);

  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  const users = data.getUsers
  const handleSubmit = (event) => {
    let obj = {}
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const foundUser = users.find((user) => user.email === isUser.email && user.password === isUser.password);
    if (isUser.email === '' || isUser.password === '') {
      obj = { ...obj, error: 'Please enter both email & password' }
    }
    else if (foundUser) {
      navigate(`/food`)
      setIsLogIn(true)
      localStorage.setItem('isLogin', true)
      localStorage.setItem('user', foundUser.fName)
    } else {
      obj = { ...obj, error: 'Please check email & password' }
      // navigate('/');
    }
    setErrorMsg(obj)
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-photo/people-taking-photos-food_23-2149303525.jpg?w=740&t=st=1698661394~exp=1698661994~hmac=3b708f84b424814d666d9e9daf944fcecc40b1e90a9ae2c21c14d94ee5a30b40)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">
              SIGN IN
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setIsUser({ ...isUser, email: e.target.value })}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setIsUser({ ...isUser, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Button onClick={() => navigate('/admin')}>
                    ADMIN LOGIN
                  </Button>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {Object.keys(errorMsg).length ? <Alert severity="error">{errorMsg.error}</Alert> : ''}
              {/* {foundUser &&
                <Alert severity="success">This is a success alert — check it out!</Alert> 
     
              } */}



            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}