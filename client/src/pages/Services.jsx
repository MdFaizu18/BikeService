import React from 'react';
import Navbar from '../components/Navbar';
import { Link, redirect, useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Tooltip } from '@mui/material';
import banner from '../assets/images/banner1.jpg';
import { BannerBox } from '../assets/wrappers/ServiceWrapper';
import customFetch from '../utils/customFetch';
import { NavButton } from '../assets/wrappers/NavbarWrapper';
import { animateScroll as scroll } from 'react-scroll';
import noServicesImg from '../assets/images/no-services.png'; // Replace with your actual image path

// using loader to get the data from the server
export const loader = async () => {
  try {
    const userData = await customFetch.get('/users/current');
    const serviceData = await customFetch.get('/services');
    return {
      userData: userData,
      serviceData: serviceData.data,
    };
  } catch (err) {
    console.error('Failed to load user data:', err);
    return redirect('/');
  }
};

// for smooth scroll behaviour 
const scrollToTop = () => {
  scroll.scrollToTop();
};

const UserContext = createContext();

const Services = () => {
  const { userData, serviceData } = useLoaderData();
  const services = serviceData.services;

  return (
    <>
      {/* navbar component  */}
      <Navbar />
      {/* for banner image  */}
      <Box sx={{ marginTop: '-1%', '@media (max-width: 600px)': { marginTop: '-15%' } }}>
        <BannerBox src={banner} />
      </Box>
      {/* content box  */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '3%',
          }}
        >
          <Typography variant='h4'>Services which were provided by us</Typography>
          <Typography
            variant='body1'
            sx={{
              marginTop: '1%',
              textAlign: 'center',
              maxWidth: '750px',
              width: '100%',
            }}
          >
            we offer comprehensive bike services including routine maintenance, repairs, and performance upgrades. Our skilled technicians use high-quality parts to ensure your bike runs smoothly. Trust us for reliable and efficient service tailored to your needs.
          </Typography>
        </Box>
        
        {/* to display the available services from loader data  */}
        {services.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 ,mb:10}}>
            <img src={noServicesImg} alt="No services found" style={{ maxWidth: '100%', maxHeight: '400px',borderRadius:'20px' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>No services available at the moment</Typography>
          </Box>
        ) : (
          <Box sx={{ padding: "0px 7%", flexGrow: 1, marginTop: '5%' }}>
            <Grid container spacing={2}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service._id} sx={{ marginBottom: '3%' }}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      maxWidth: 345,
                      cursor: 'pointer',
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.image}
                      alt={service.serviceName}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flex: 1, position: 'relative' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {service.serviceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                      <Typography variant="body1" color="text.primary" sx={{ background: 'grey', textAlign: 'center', borderRadius: '10px', marginTop: '5%', color: 'white', width: '80px' }}>
                        ₹{service.price}
                      </Typography>
                      <Box onClick={scrollToTop} sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                        <Tooltip title="Book">
                          <NavButton component={Link} to={`/services/${service._id}`}>Book</NavButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Services;
export const useUserContext = () => useContext(UserContext);
