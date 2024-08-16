import { Box, Button, Typography } from '@mui/material'
import React from 'react';
import about from '../assets/images/works6.jpg';
import { AboutBox, ImageBox, ImageBox2 } from '../assets/wrappers/HomeWrapper';
import Navbar from '../components/Navbar';
import banner from '../assets/images/banner2.jpg';
import { BannerBox } from '../assets/wrappers/ServiceWrapper';
import BrandLogos from '../components/BrandLogos';
import Footer from '../components/Footer';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const About = () => {
    return (
        <>
            <Navbar />
            <Box sx={{
                marginTop: '-5%', '@media (max-width: 600px)': {
                    marginTop: '-15%'
                }
            }}>
                <BannerBox src={banner} />
            </Box>
            <Box>
                <Box sx={{ padding: '6% 7% 3% 7%' }}>

                    <Box sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5%', '@media (max-width: 600px)': {
                            flexDirection: 'column'
                        }
                    }}>
                        <Box sx={{}}>
                            <ImageBox2 src={about} alt="serviceImg" />
                        </Box>

                        <Box sx={{
                            display: 'flex', flexDirection: 'column', gap: '10px', '@media (max-width: 600px)': {
                              
                            }
                        }}>
                            <Box>
                                <Typography variant='h3'>Why you have to choose us ?</Typography>
                            </Box>
                            <Box>
                                <Typography variant='body1'>At our shop, we offer a wide range of bike services to ensure your bike remains in top condition. Whether you need routine maintenance, repairs, or upgrades, our experienced technicians are here to help. We take pride in providing high-quality service and expert advice to keep your bike running smoothly.</Typography>
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', gap: "30px", marginTop: '10px' }}>

                                    <AboutBox >
                                        <ConstructionIcon sx={{ fontSize: '50px' }} />
                                        <Typography>All Services</Typography>
                                    </AboutBox>

                                    <AboutBox>
                                        <SettingsSuggestIcon sx={{ fontSize: '60px' }} />
                                        <Typography>Friendly Team</Typography>
                                    </AboutBox>

                                    <AboutBox>
                                        <ThumbUpIcon sx={{ fontSize: '50px' }} />
                                        <Typography>Trustable</Typography>
                                    </AboutBox>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
            <Box sx={{ margin: '2% 8% 5% 8%' }}>
                <Box sx={{ margin: '0 0 3% 0' }}>
                    <Typography variant='h4' textAlign={'center'}>Our Services for Popular Brands</Typography>
                </Box>
                {/* brand logos in marque  */}
                <BrandLogos />
            </Box>
            <Box>
                <Footer />
            </Box>
        </>
    )
}

export default About