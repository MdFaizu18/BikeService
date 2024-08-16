import { Box, Button, Typography } from '@mui/material'
import React from 'react';
import landing from '../assets/images/landing.jpg';
import about from '../assets/images/works4.jpg';
import { AboutBox, ImageBox, ImageBox2 } from '../assets/wrappers/HomeWrapper';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';

const ScrollToTop =()=>{
    window.scrollTo({ top: 0, behavior:'smooth' });
}

const LandingPage = () => {
    return (
        <>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5%', gap: '5%',
                '@media (max-width: 600px)': {
                    flexDirection: 'column-reverse'
                }
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Box>
                        <Typography variant='h2' sx={{
                            '@media (max-width: 600px)': {
                                fontSize: '36px'
                            }
                        }}>Explore our shop for various services</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body1'>At our shop, we offer a wide range of bike services to ensure your bike remains in top condition. Whether you need routine maintenance, repairs, or upgrades, our experienced technicians are here to help. We take pride in providing high-quality service and expert advice to keep your bike running smoothly.</Typography>
                    </Box>
                    <Box sx={{marginTop:'10px'}}>
                        <Box component={Link} to='/about' onClick={ScrollToTop} sx={{ textDecoration: 'none', background: '#EF5A70', width: 'fit-content', color: 'white', padding: '5px 10px', marginTop: '3%', marginBottom: '3%', cursor: 'pointer', '&:hover': { background: '#EF5A70' ,color:'white'}}} >Explore More</Box>
                    </Box>
                </Box>
                <Box sx={{}}>
                    <ImageBox src={landing} alt="serviceImg" />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5%', gap: '5%',
                '@media (max-width: 600px)': {
                    flexDirection: 'column'
                }
            }}>
                <Box sx={{}}>
                    <ImageBox2 src={about} alt="serviceImg" />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Box>
                        <Typography variant='h2' sx={{
                            '@media (max-width: 600px)': {
                                fontSize: '36px'
                            }
                        }}>Why you have to choose us ?</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body1'>we stand out for our commitment to excellence in bike service. Our team of expert technicians brings years of experience and a passion for bikes, ensuring that every repair and service is handled with precision and care. We offer a comprehensive range of services, from routine maintenance to custom upgrades, using only high-quality parts and state-of-the-art equipment. </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: "20px", marginTop: '10px' }}>

                        <AboutBox >
                            <ConstructionIcon sx={{ fontSize: '50px' }} />
                            <Typography>All Services</Typography>
                        </AboutBox>

                        <AboutBox>
                            <SettingsSuggestIcon sx={{ fontSize: '60px' }} />
                            <Typography textAlign={'center'}>Friendly Team</Typography>
                        </AboutBox>

                        <AboutBox>
                            <ThumbUpIcon sx={{ fontSize: '50px' }} />
                            <Typography>Trustable</Typography>
                        </AboutBox>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default LandingPage