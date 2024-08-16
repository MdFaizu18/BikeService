import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, TextField, Paper, Box, Grid, Typography } from '@mui/material';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo3.jpg'
import Image from '../assets/images/registers.jpg';

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

const Register = () => {

    // Initalizing form using useState 
    const [form, setForm] = useState({
        userName: '',
        email: '',
        mobileNo: '',
        password: '',
    });
    
    // for submit button and to navigate to login page 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // for handling the form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // for handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await customFetch.post("/auth/register", form);
            toast.success("Registration Successful");
            navigate("/login");
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error?.response?.data?.msg || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
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
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="userName"
                                autoComplete="username"
                                autoFocus
                                value={form.userName}
                                onChange={handleChange}
                            />
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
                                id="mobileNumber"
                                label="Mobile Number"
                                name="mobileNo"
                                autoComplete="tel"
                                value={form.mobileNo}
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
                                Register
                            </Button>
                            <Grid container>
                                <Grid item xs />
                                <Grid item>
                                    <Link to="/login" style={{ textDecoration: 'none' }}>
                                        {"Already have an account? Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
