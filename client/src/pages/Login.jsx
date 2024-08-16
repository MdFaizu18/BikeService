import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo3.jpg'
import Image from '../assets/images/login.jpg';
import customFetch from '../utils/customFetch';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Bike Service
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Login = () => {
    // intialzing the form using useState 
    const [form, setForm] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // handling form changes  using handleChange function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // handling form submission using handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log('Form data:', form);
            const response = await customFetch.post("/auth/login", form);
            toast.success("User Logged In Successfully");

            // Store email and ID in localStorage
            localStorage.setItem('email', form.email);
            localStorage.setItem('userId', response.data.userId); 
            // Check the user role
            if (response.data.role === 'admin') {
                navigate("/admin"); // Redirect to admin page if role is admin
            } else {
                navigate("/"); // Redirect to home page for other roles
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error?.response?.data?.msg || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${Image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, height: '70px', width: '80px' }}>
                        <img src={logo} alt="" height={70} width={100} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
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
                            value={form.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, background: '#EF5A70', '&:hover': { background: "#EF5A7099" } }}
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    {"Back to Home"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
