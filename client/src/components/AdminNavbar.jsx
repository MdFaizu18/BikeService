import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StyleIcon from '@mui/icons-material/Style';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ConstructionIcon from '@mui/icons-material/Construction';
import logo from '../assets/images/logo3.jpg';
import Button from '@mui/material/Button';
import customFetch from '../utils/customFetch'; // Import your custom fetch utility
import { toast } from 'react-toastify'; // Import your toast notifications
import { NavButton } from '../assets/wrappers/NavbarWrapper';

const drawerWidth = 240;

const AdminNavbar = (props) => {
    const { propName } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const navigate = useNavigate(); // Use navigate from react-router-dom

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const logoutUser = async () => {
        try {
            await customFetch.get("/auth/logout");
            toast.success("Logged out successfully");
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error("Logout failed");
        }
    };

    const drawer = (
        <div>
            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', placeItems: 'center', gap: '0px', padding: '5px 10px' }}  >
                <img src={logo} alt="AppLogo" height="60px" width="80px" style={{ borderRadius: '50px' }} />
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: '600', color: "#EF5A6F" }} variant='h6'>Bike</Typography>
                    <Typography variant='h6' sx={{ fontWeight: '600' }}>Services</Typography>
                </Box>
            </Box>

            <Divider />
            <List sx={{ marginTop: '15%' }}>
                <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={1} disablePadding>
                        <ListItemButton sx={{ marginLeft: '5%' }}>
                            <ListItemIcon >
                                <DashboardIcon sx={{ color: '#F5004F' }} />
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to="/admin/services" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={2} disablePadding>
                        <ListItemButton sx={{ marginLeft: '5%' }}>
                            <ListItemIcon >
                                <ConstructionIcon sx={{ color: 'black' }} />
                            </ListItemIcon>
                            <ListItemText primary={'Services'} />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to="/admin/services/create" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={3} disablePadding>
                        <ListItemButton sx={{ marginLeft: '5%' }}>
                            <ListItemIcon>
                                <AddBusinessIcon sx={{ color: '#EB5B00' }} />
                            </ListItemIcon>
                            <ListItemText primary={'Add Services'} />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to="/admin/bookings" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={4} disablePadding>
                        <ListItemButton sx={{ marginLeft: '5%' }}>
                            <ListItemIcon>
                                <StyleIcon sx={{ color: 'purple' }} />
                            </ListItemIcon>
                            <ListItemText primary={'Bookings'} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%', background: "#EF5A6F" }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ marginLeft: '5%', justifyContent: 'center' }}>
                            <ListItemText primary={'Back to Home'} sx={{ textAlign: 'center', color: 'white', fontWeight: '600' }} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: {
                        sm: `${drawerWidth}px`,
                        background: 'white',
                        color: 'black'
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <HomeRepairServiceIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box>
                            <Typography variant='body1' sx={{ fontWeight: '500' }}>{propName}</Typography>
                        </Box>
                        <NavButton color="inherit" onClick={logoutUser} sx={{ ml: 2 }}>
                            Logout
                        </NavButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        position: 'static',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {/* Main content goes here */}
            </Box>
        </Box>
    );
}

export default AdminNavbar;

