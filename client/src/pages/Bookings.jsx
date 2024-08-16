import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import customFetch from '../utils/customFetch';
import { useLoaderData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import noBookingsImg from '../assets/images/no-bookings.png'; // Replace with your actual image path

// to getting data from the loader in the server 
export const loader = async () => {
  try {
    const userData = await customFetch.get('/bookings/own');
    const bookingData = userData.data;
    return bookingData;
  } catch (err) {
    console.error('Failed to load user data:', err);
    return redirect('/');
  }
};

// to get the structure date 
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Bookings = () => {
  const bookingData = useLoaderData();
  const bookings = bookingData.bookings;


  // to edit the bookings data
  const handleEdit = (id) => {
    // Navigate to edit page or open an edit dialog
    console.log('Edit booking with id:', id);
  };

  // to delete the bookings data
  const handleDelete = async (id) => {
    try {
      await customFetch.delete(`/bookings/${id}`);
      toast.success(`Booking deleted successfully`);
      window.location.reload();
      console.log('Deleted booking with id:', id);
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'red';
      case 'Ready for delivery':
        return '#FF8225';
      case 'Completed':
        return 'green';
      default:
        return 'black'; // Default color
    }
  };

  return (
    <div>
      {/* imorting navbar  */}
      <Navbar />

      {/* showing bookings details in table  */}
      <Box sx={{ padding: '3% 5% 5% 5%' }}>
        <Typography variant="h4" gutterBottom>Your Bookings</Typography>
        {bookings.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4,borderRadius:'20px' }}>
            <img src={noBookingsImg} alt="No bookings found" style={{ maxWidth: '100%', maxHeight: '400px' ,borderRadius:'20px'}} />
            <Typography variant="h6" sx={{ mt: 2 }}>You haven't booked anything yet !!</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Service Name</TableCell>
                  <TableCell>Bike Model</TableCell>
                  <TableCell>Booking Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Service Price</TableCell>
             <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
                  {bookings.map((booking) => (
              <TableBody>
                  <TableRow key={booking._id}>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell> {formatDate(booking.createdAt)}</TableCell>
                    <TableCell>{booking.serviceName}</TableCell>
                    <TableCell>{booking.bikeModel}</TableCell>
                    <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                        <TableCell sx={{
                          color: getStatusColor(booking.status),
                          fontWeight: 'bold',
                        }}>{booking.status}</TableCell>
                    <TableCell> ₹ {booking.price}</TableCell>
                        <TableCell>
                          {booking.status === 'Pending' ? (
                            <>
                             
                              <Button
                                variant="contained"
                                sx={{
                                  background: 'rgba(255,10,10,0.7)',
                                  '&:hover': { background: 'rgba(255,10,10,1)' },
                                }}
                                onClick={() => handleDelete(booking._id)}
                              >
                                Delete
                              </Button>
                            </>
                          ) : booking.status === 'Ready for delivery' ? (
                            <Button
                              variant="contained"
                              sx={{
                                background: '#FF8225',
                                curson:"not-allowed",
                                '&:hover': { background: 'rgba(0,150,0,1)' },
                              }}
                            >
                              On Progress
                            </Button>
                          ) : booking.status === 'Completed' ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    background: 'green',
                                    curson: "not-allowed",
                                    '&:hover': { background: 'green' },
                                  }}
                                >
                                 Got it !
                                </Button>
                          ) : null}
                        </TableCell>
                  </TableRow>
              </TableBody>
                ))}
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
};

export default Bookings;
