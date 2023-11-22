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
import { ADD_FOOD, DELETE_FOOD, GET_ALLFOOD } from './queries';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { InputLabel, MenuItem, Select } from '@mui/material';

const defaultTheme = createTheme();

export default function AddFood() {
    const navigate = useNavigate();
    const [addNewFood, setNewAddFood] = React.useState({ name: "", key: "", description: "", image: "", price: "" })

    const [addFood] = useMutation(ADD_FOOD, {
        refetchQueries: [{ query: GET_ALLFOOD }],
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        addFood({
            variables: {
                foodInput: {
                    name: data.get('name'),
                    key: data.get('key'),
                    description: data.get('description'),
                    image: data.get('image'),
                    price: parseInt(data.get('price')),
                }
            },
        })
        navigate(`/food`);
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={(e) => setNewAddFood({ ...addNewFood, name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">category</InputLabel>
                                <Select
                                    fullWidth
                                    name="key"
                                    label="key"
                                    type="key"
                                    id="key"
                                    autoComplete="key"
                                    onChange={(e) => setNewAddFood({ ...addNewFood, key: e.target.value })}
                              
                                >
                                    <MenuItem value={1}>Pizza</MenuItem>
                                    <MenuItem value={2}>Burger</MenuItem>
                                    <MenuItem value={3}>Dessert</MenuItem>
                                    <MenuItem value={4}>Sandwich</MenuItem>
                                    <MenuItem value={5}>Hot Drinks</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"

                                    id="description"
                                    autoComplete="description"
                                    onChange={(e) => setNewAddFood({ ...addNewFood, description: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="image"
                                    label="image"
                                    id="image"
                                    autoComplete="image"
                                    onChange={(e) => setNewAddFood({ ...addNewFood, image: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="price"
                                    label="price"
                                    id="price"
                                    autoComplete="price"
                                    onChange={(e) => setNewAddFood({ ...addFood, price: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ADD FOOD
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
