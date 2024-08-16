import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Drawer, IconButton, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import MenuIcon from '@mui/icons-material/Menu';
import { ListBox, ListBox2, NavBox, NavButton, NavButton2 } from '../assets/wrappers/NavbarWrapper';
import logo from '../assets/images/logo3.jpg';
import customFetch from '../utils/customFetch'; // Ensure customFetch is imported
import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading spinner
    const navigate = useNavigate();

    useEffect(() => {
        // Check localStorage for email
        const email = localStorage.getItem('email');
        setIsLoggedIn(!!email); // Set logged in state based on the presence of email
    }, []);

    const logoutUser = async () => {
        try {
            await customFetch.get("/auth/logout");
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            toast.success("Logged out successfully");
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error("Logout failed");
        }
    };

    // to setting permission to visit services only when user logged in 
    const handleNavClick = (e, link) => {
        e.preventDefault(); // Prevent default navigation
        if (!isLoggedIn) {
            toast.error("You have to log in to access this page"); // Show toast message
            navigate('/login'); // Redirect to login page
        } else {
            scroll.scrollToTop(); // Scroll to top before navigation
            setLoading(true); // Show the loading spinner
            setTimeout(() => {
                navigate(link); // Navigate after delay
                setLoading(false); // Hide the loading spinner
            }, 1000); // Duration of loading spinner
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
    };

    const handleDrawerToggle = () => {
        setDrawerOpen((prevOpen) => !prevOpen);
    };

    const drawer = (
        <Box
            sx={{
                width: 240,
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                bgcolor: 'background.paper',
                boxSizing: 'border-box',
            }}
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
        >
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="logo" width={50} height={30} />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold', color: '#EF5A6F' }}>
                    Bike Services
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '350px' }}>
                <ListBox2 onClick={scrollToTop} component={Link} to='/' sx={{ display: 'block', mb: 1 }}>
                    Home
                </ListBox2>
                <hr />
                <ListBox2
                    component={Link}
                    to='/services'
                    onClick={(e) => handleNavClick(e, '/services')}
                    sx={{ display: 'block', mb: 1 }}
                >
                    Services
                </ListBox2>
                <hr />
                <ListBox2
                    component={Link}
                    to='/about'
                    sx={{ display: 'block', mb: 1 }}
                >
                    About
                </ListBox2>
                <hr />
                <ListBox2
                    component={Link}
                    to='/bookings'
                    onClick={(e) => handleNavClick(e, '/bookings')}
                    sx={{ display: 'block', mb: 1 }}
                >
                    Bookings
                </ListBox2>
                <hr />
                <ListBox2 component={Link} to='/contact' sx={{ display: 'block', mb: 1 }}>
                    Contact
                </ListBox2>
                <hr />
            </Box>

            <Box sx={{ mt: 2 }}>
                {isLoggedIn ? (
                    <NavButton2 onClick={logoutUser} color="inherit" sx={{ width: '100%' }}>
                        Logout
                    </NavButton2>
                ) : (
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <NavButton2 color="inherit" sx={{ width: '100%' }}>
                            Login
                        </NavButton2>
                    </Link>
                )}
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ background: 'white', boxShadow: '0px 0px 3px grey' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <ConstructionIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <NavBox>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <Box>
                                <img src={logo} alt="logo" width={50} height={50} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: '2px' }}>
                                <Typography sx={{ fontWeight: '600', color: "#EF5A6F" }} variant='h6'>Bike</Typography>
                                <Typography variant='h6' sx={{ fontWeight: '600', color: 'black' }}>Services</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'start', marginLeft: '13%', flexGrow: 2 }}>
                            <ListBox component={Link} to='/' >Home</ListBox>
                            <ListBox
                                component={Link}
                                to='/services'
                                onClick={(e) => handleNavClick(e, '/services')}
                            >
                                Services
                            </ListBox>
                            <ListBox
                                onClick={scrollToTop}
                                component={Link}
                                to='/about'
                            >
                                About
                            </ListBox>
                            <ListBox
                                component={Link}
                                to='/bookings'
                                onClick={(e) => handleNavClick(e, '/bookings')}
                            >
                                Bookings
                            </ListBox>
                            <ListBox component={Link} to='/contact' >Contact</ListBox>
                        </Box>

                        <Box sx={{ marginLeft: 'auto', display: { xs: 'none', sm: 'block' } }}>
                            {isLoggedIn ? (
                                <Box sx={{ display: 'flex' }}>
                                    <Box>
                                        <NavButton onClick={logoutUser} color="inherit">Logout</NavButton>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <Link to='/login'>
                                        <NavButton color="inherit">Login</NavButton>
                                    </Link>
                                </Box>
                            )}
                        </Box>
                    </NavBox>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
            <Box component="main" sx={{ padding:'0' }}>
                <Toolbar />
                {loading && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1300, // Ensure spinner is on top of other content
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Navbar;

