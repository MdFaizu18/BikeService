import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import LandingPage from './LandingPage';
import BrandLogos from '../components/BrandLogos';
import backImg from '../assets/images/back1.png';
import mainBanner from '../assets/images/main-banner.jpg';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  heading: {
    animation: 'slideInFromBottom 2s ease-out',
    '@keyframes slideInFromBottom': {
      '0%': {
        transform: 'translateY(50px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  subheading: {
    color: 'rgba(255,255,255,0.9)',
    animation: 'slideInFromBottom 3s ease-out 0.5s',
    '@keyframes slideInFromBottom': {
      '0%': {
        transform: 'translateY(50px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleExploreServicesClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/services');
    }, 500); // Show the loading spinner for 1 second before navigating
  };

  return (
    <div>
      <>
        <Navbar />
        <Box sx={{
          padding: '-1% 0%',
          marginTop: '0%',
          backgroundImage: `url(${mainBanner})`,
          backgroundSize: 'cover',
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
        }}>
          <Typography variant='h2' sx={styles.heading}>
            Welcome to Bike Services
          </Typography>
          <Typography variant='h5' sx={styles.subheading}>
            We are here to provide you with the best bike services
          </Typography>
          <Button
            // onClick={handleExploreServicesClick}
            sx={{ background: '#EF5A70', padding: '5px 10px', fontWeight: '600', color: 'white', marginTop: '20px', '&:hover': { background: '#EF5A70',color:'white' } }}
            disabled={loading}
          >
          Explore services
          </Button>
        </Box>

        <Box sx={{
          padding: '2% 7%',
          backgroundImage: `url(${backImg})`,
          backgroundColor: '#f9fafe'
        }}>
          <LandingPage />
        </Box>

        <Box sx={{ margin: "8% 0 5% 0" }}>
          <Box sx={{ margin: '0 0 3% 0' }}>
            <Typography variant='h4' textAlign={'center'}>Our Services for Popular Brands</Typography>
          </Box>

          <Box sx={{ padding: '0 7%' }}>
            <BrandLogos />
          </Box>
        </Box>
        <Box>
          <Footer />
        </Box>
      </>
    </div>
  );
};

export default Home;

