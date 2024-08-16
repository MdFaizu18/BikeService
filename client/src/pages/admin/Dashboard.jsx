import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { AdminCard, AdminContainer, AdminDetailBox, MainBox, PaperBox } from '../../assets/wrappers/AdminWrapper';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get('/users/current');
    const stats  = await customFetch.get('/bookings/stats');
    const services  = await customFetch.get('/services');
    const users  = await customFetch.get('/users');
    return {data,stats,services,users};
  } catch (error) {
    toast.error("Acess Denied !!");
    return redirect('/');
  }
};



// Sample data (replace with actual data from your API)


const Dashboard = () => {
  const {data,stats,services,users} = useLoaderData();
  const user = data.user;
  const statsData = stats.data.stats || {};
  console.log(statsData)
  const total = statsData.reduce((acc, item) => acc + item.count, 0);
  const serviceTotal = services.data.services.length;
  const userTotal = users.data.users.length-1;
  const count1 = (statsData[0]?.count || 0);         //peding
  const count2 = (statsData[2]?.count || 0);        //ready for delivery
  const count3 = (statsData[1]?.count || 0);        //completed
    return (
    <div>
      <AdminNavbar propName="Dashboard" />
      <AdminContainer>
        <MainBox>
          {/* Left Box for Statistics */}
          <Box sx={{
            flex: 1, padding: 2, '@media (max-width: 600px)': {
              padding: '0',
            }}}>
            <Typography variant="h5" sx={{fontWeight:'600',color:'#FF2885'}}gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={12} md={4}>
                <PaperBox elevation={3} sx={{background:'rgba(255,10,10,.9)'}}>
                 <Box>
                    <Typography variant="body2" sx={{color:'white'}}>Pending</Typography>
                    <Typography variant="h4" sx={{ color: 'White' }}>
                      {count1}
                    </Typography>
                 </Box>
                </PaperBox>
              </Grid>
              <Grid item xs={6} sm={6} md={4}>
                <PaperBox elevation={3} sx={{background:'orange'}}>
                  <Box>
                    <Typography variant="body2" sx={{color:'white'}}> Ready to Delivery</Typography>
                    <Typography variant="h4" sx={{ color: 'white' }}>  {count2}</Typography>
                  </Box>
                </PaperBox>
              </Grid>
              <Grid item xs={6} sm={6} md={4}>
                <PaperBox elevation={3} sx={{background:'green'}} >
                 <Box>
                    <Typography variant="body2" sx={{color:'white'}}> Completed</Typography>
                    <Typography variant="h4" sx={{ color: 'white' }}>  {count3}</Typography>
                 </Box>
                </PaperBox>
              </Grid>
              <Grid item xs={6} sm={6} md={12}>
                <PaperBox elevation={3} >
                <Box>
                    <Typography variant="h6">Total Bookings</Typography>
                    <Typography variant="h4" color="success">{total}</Typography>
                </Box>
                </PaperBox>
              </Grid>
              <Grid item xs={6} sm={6} md={12}>
                <PaperBox elevation={3}>
               <Box>
                    <Typography variant="h6">Services Available</Typography>
                    <Typography variant="h4" color="success">{serviceTotal}</Typography>
               </Box>
                </PaperBox>
              </Grid>
              <Grid item xs={6} sm={6} md={12}>
                <PaperBox elevation={3}>
                 <Box>
                    <Typography variant="h6">Customers </Typography>
                    <Typography variant="h4" color="success">{userTotal}</Typography>
                 </Box>
                </PaperBox>
              </Grid>
              
            </Grid>
          </Box>

          {/* Right Box for User Details */}
          <AdminDetailBox>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              Admin Details
            </Typography>
            <AdminCard variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Username:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  {user.userName}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Email:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  {user.email}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Phone Number:
                </Typography>
                <Typography variant="body1">
                  {user.mobileNo}
                </Typography>
                
              </CardContent>
            </AdminCard>
          </AdminDetailBox>
        </MainBox>
      </AdminContainer>
    </div>
  );
};

export default Dashboard;
