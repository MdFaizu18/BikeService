import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { AdminContainer } from '../../assets/wrappers/AdminWrapper';
import customFetch from '../../utils/customFetch';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import noServicesImg from '../../assets/images/no-services.png'; // Replace with your actual image path

// to get the userData from the loader in the server 
export const loader = async () => {
  try {
    const userData = await customFetch.get('/services');
    return userData.data;
  } catch (err) {
    console.error('Failed to load user data:', err);
    return redirect('/');
  }
};

const AdminServices = () => {
  const navigate = useNavigate();
  const userData = useLoaderData();
  const services = userData.services;

  // to edit the service data
  const handleEdit = (serviceId) => {
    navigate(`/admin/services/${serviceId}`);
  };

  // to delete the service data
  const handleDelete = async (serviceId) => {
    try {
      const result = prompt("Are you sure you want to delete this service?", "yes");
      if (result === "yes") {
        await customFetch.delete(`/services/${serviceId}`);
        toast.success("Service deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete the service.');
    }
  };

  return (
    <div>
      <AdminNavbar propName="Services" />
      <AdminContainer>
        <Box sx={{ mb: 1 }}>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>
            Available Services
          </Typography>
        </Box>
        {services.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <img src={noServicesImg} alt="No services found" style={{ width: '380px', height: 'auto' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>You haven't add any services yet!!</Typography>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, marginTop: '5%' }}>
            <Grid container spacing={2}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service._id} sx={{ marginBottom: '3%' }}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      maxWidth: 345,
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.image}
                      alt={service.serviceName}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flex: 1, position: 'relative' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {service.serviceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        ₹{service.price}
                      </Typography>
                      <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEdit(service._id)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(service._id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </AdminContainer>
    </div>
  );
};

export default AdminServices;
