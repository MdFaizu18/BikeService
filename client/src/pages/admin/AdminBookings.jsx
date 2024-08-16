import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import customFetch from '../../utils/customFetch';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import noBookingsImg from '../../assets/images/no-bookings.png'; // Update with the correct path

// to get the data from the loader in ServerStyleSheet 
export const loader = async () => {
  try {
    const userData = await customFetch.get('/bookings');
    const bookingData = userData.data;
    return bookingData;
  } catch (err) {
    console.error('Failed to load user data:', err);
    return redirect('/');
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

const AdminBookings = () => {

  // to get the navigation and data 
  const navigate = useNavigate();
  const bookingData = useLoaderData();
  const bookings = bookingData.bookings;

  // to edit the booking data to Ready for delivery or completed 
  const handleEdit = (bookingId) => {
    navigate(`/admin/bookings/${bookingId}/edit`);
  };

  // to delete the user bookings 
  const handleDelete = async (bookingId) => {
    try {
      const result = prompt("Are you sure you want to delete this booking?", "yes");
      if (result === "yes") {
        await customFetch.delete(`/bookings/${bookingId}`);
        toast.success("Booking deleted successfully!");
        window.location.reload(); // Optionally reload the page to update the list
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete the booking.');
    }
  };

  return (
    <div>
      <AdminNavbar propName="Bookings" />
      <Box sx={{
        padding: '2% 20%', '@media (max-width: 600px)': {
          padding: '0 0'
        }
      }}>
        <Typography variant="h4" gutterBottom sx={{
          mt: 2, '@media (maxWidth: 600px)': {
            mt: 10, ml: 10
          }
        }}>
          All Bookings
        </Typography> 
        {/* if the there is no booking it will show this image  */}
        {bookings.length === 0 ? (
          <Container sx={{
            textAlign: 'center', margin: "5% 7%", '@media (maxWidth: 600px)': {
              margin: '0% 0%'
            }
          }}>
            <img src={noBookingsImg} alt="No bookings" style={{
              width: '400px', '@media (maxWidth: 600px)': {
                width: '300px'
              }
            }} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              No bookings available.
            </Typography>
          </Container>
        ) : 
        (
          <TableContainer component={Paper} sx={{ width: '1150px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Service Name</TableCell>
                  <TableCell>Bike Model</TableCell>
                  <TableCell>Booking Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>{booking.serviceName}</TableCell>
                    <TableCell>{booking.bikeModel}</TableCell>
                    <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                    <TableCell sx={{
                      color: getStatusColor(booking.status),
                      fontWeight: 'bold',
                    }}>{booking.status}</TableCell>
                    <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {booking.status !== "Completed" ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(booking._id)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(booking._id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </>
                      ) : (
                        <Button sx={{ background: 'green', color: 'white', '&:hover': { background: 'green', color: 'white' } }}>Done</Button>
                      )}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
};

export default AdminBookings;
