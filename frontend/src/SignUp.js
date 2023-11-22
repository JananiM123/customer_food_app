import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { ADD_USER } from './queries';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, InputAdornment } from '@mui/material';
const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = React.useState({
        fName: '',
        lName: '',
        lName: '',
        password: '',
        address: ''
    });
    const [addUser] = useMutation(ADD_USER);
    const [isReg, setReg] = React.useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        addUser({
            variables: {
                regInput: {
                    fName: data.get('firstName'),
                    lName: data.get('lName'),
                    email: data.get('email'),
                    password: data.get('password'),
                    address: data.get('address')
                }
            },
        })
        setReg(true)
        setTimeout(()=>{
            navigate('/');
        },1500)
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                    <Typography component="h1" variant="h5">
                        SIGN UP
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={(e) => setUserDetails({ ...userDetails, fName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => setUserDetails({ ...userDetails, lName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={24}>
                                <TextareaAutosize
                                    onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}

                                    name='address' style={{ width: "100%", borderRadius: "1px", borderColor: "#D0D0D0" }} minRows={5} placeholder=" Address" />
                            </Grid>
                            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        {isReg &&
                            <Alert severity="success">Registered Sucessfully</Alert>
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
