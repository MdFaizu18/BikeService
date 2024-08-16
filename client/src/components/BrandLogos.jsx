import React from 'react';
import yamaha from '../assets/images/yamaha.jpg';
import honda from '../assets/images/honda.jpg';
import ktm from '../assets/images/ktm.jpg';
import bajaj from '../assets/images/bajaj.jpg';
import pinarello from '../assets/images/pinarello.jpg';
import royal from '../assets/images/royal.jpg';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

const MarqueeWrapper = styled(Box)({
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
});

const MarqueeContent = styled(Box)({
    display: 'flex',
    width: 'calc(200px * 5 * 2)', // 5 items, duplicated for seamless effect
    animation: 'scroll 20s linear infinite',
    '@keyframes scroll': {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' }, // Half the content width
    },
});

const LogoBox = styled(Box)({
    display: 'inline-block',
    height: '180px',
    width: '200px',
    margin: '0 10px',
    '@media (max-width: 600px)': {
        height: '120px',
        width: '160px',
        margin: '0 5px',
    },
});

const BrandLogos = () => {
    const logos = [yamaha, bajaj, ktm, pinarello, honda,royal];

    return (
        <MarqueeWrapper>
            <MarqueeContent>
                {[...logos, ...logos].map((logo, index) => (
                    <LogoBox key={index}>
                        <img src={logo} alt={`Brand ${index}`} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                    </LogoBox>
                ))}
            </MarqueeContent>
        </MarqueeWrapper>
    );
};

export default BrandLogos;
