import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterWrapper = styled(Box)({
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    position: 'relative',
    bottom: 0,
    width: '100%',
    boxShadow: '0px -1px 5px rgba(0, 0, 0, 0.1)',
});

const Footer = () => {
    return (
        <FooterWrapper>
            <Typography variant="body2">
                © {new Date().getFullYear()} Bike Services. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: '5px' }}>
                <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a> |
                <a href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none' }}> Terms of Service</a>
            </Typography>
        </FooterWrapper>
    );
};

export default Footer;
