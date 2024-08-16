import React from 'react'
import Navbar from '../components/Navbar'
import { BannerBox } from '../assets/wrappers/ServiceWrapper'
import { Box } from '@mui/material';
import BannerImg from '../assets/images/banner1.jpg'
import ServiceBookForm from '../components/ServiceBookForm';
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';

// Fetch user data and current service data from API when the page loads.
export const loader = async ({params}) => {
  try {
    const userData = await customFetch.get('/users/current');
    const currentService = await customFetch.get(`/services/${params.id}`);
    return {
      userData: userData,
      serviceData: currentService,
    };
  } catch (err) {
    console.error('Failed to load user data:', err);
    return redirect('/');
  }
};



const EachServices = () => {
  // Fetch user data and current service data from API when the page loads.
  const {userData,serviceData} = useLoaderData();
  const user = userData.data.user;
  const service = serviceData.data.service;
  console.log(user);
  console.log(service);

  return (
    <div>
        <Navbar/>
      <Box sx={{
        marginTop: '-5%', '@media (max-width: 600px)': {
          marginTop: '-15%',
          display:'none'
        }
      }}>
        <BannerBox src={BannerImg} />
      </Box>
        <Box sx={{ padding: '6% 7%' }}>
              <ServiceBookForm user={user} service={service}/>
          </Box>
    </div>
  )
}

export default EachServices