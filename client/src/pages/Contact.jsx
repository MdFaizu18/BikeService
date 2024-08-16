import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Navbar from '../components/Navbar';
import 'leaflet/dist/leaflet.css';
import bannerImg from '../assets/images/main-banner.jpg'
import L from 'leaflet';

// Ensure Leaflet icons are loaded correctly
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
});

const Contact = () => {
  const mapCenter = [11.664325, 78.146011];

  const contactDetails = {
    name: 'Mohammed Faizulla',
    email: 'contact@bikeservices.com',
    phone: '0427-123456',
    whatsapp: '9876543210',
    address: '132/10, Old Bustand Opposite, Salem, Tamil Nadu, India',
  };

  return (
    <>
      <Navbar />
     <Box sx={{
      marginTop:'-3%',
      backgroundImage: `url(${bannerImg})`,
      backgroundSize: 'cover',
      height: '1000px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
     }}>

        <Box sx={{ padding: '2% 2%', minHeight: '100vh' }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, textAlign: 'center', color:'white',fontWeight: 'bold',  }}
          >
            Contact Us
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 3,
              padding: '0 5%',
              '@media (max-width: 600px)': {
                flexDirection: 'column',
                padding: '0 2%',
              },
            }}
          >
            {/* Left Box - Leaflet Map */}
            <Box
              sx={{
                flex: 1,
                height: { xs: '300px', sm: '400px' }, // Responsive height
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  transition: 'box-shadow 0.3s ease-in-out',
                },
              }}
            >
              <Paper elevation={3} sx={{ height: '100%', width: '100%' }}>
                <MapContainer
                  center={mapCenter}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap contributors'
                  />
                  <Marker position={mapCenter} icon={defaultIcon}>
                    <Popup>Your Location</Popup>
                  </Marker>
                </MapContainer>
              </Paper>
            </Box>

            {/* Right Box - Contact Details */}
            <Box
              sx={{
                flex: 1,
                padding: '2% 6%',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  transition: 'box-shadow 0.3s ease-in-out',
                },
              }}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Contact Information
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong style={{ color: '#F5004F' }}>Name:</strong> {contactDetails.name}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong style={{ color: '#F5004F' }}>Phone:</strong> {contactDetails.phone}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong style={{ color: '#F5004F' }}>Whatsapp No:</strong> {contactDetails.whatsapp}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong style={{ color: '#F5004F' }}>Email:</strong> {contactDetails.email}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong style={{ color: '#F5004F' }}>Address:</strong> {contactDetails.address}
              </Typography>
            </Box>
          </Box>
        </Box>

     </Box>
    </>
  );
};

export default Contact;
