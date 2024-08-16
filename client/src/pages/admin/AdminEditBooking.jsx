import React, { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import customFetch from '../../utils/customFetch';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminContainer } from '../../assets/wrappers/AdminWrapper';
import img from '../../assets/images/service-banner.jpeg'

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/bookings/${params.id}`);
        const userData = await customFetch.get('/users/current');
        return { data, userData: userData };
    } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to load booking details.');
        return redirect('/admin');
    }
};

const AdminEditBooking = () => {
    const { data, userData } = useLoaderData();
    const user = userData.data.user;
    const [formData, setFormData] = useState({
        customerName: data.booking.customerName || '',
        serviceName: data.booking.serviceName || '',
        status: data.booking.status || 'Pending',
        email: data.booking.email || '',
        bikeModel: data.booking.bikeModel || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log('Booking ID:', data.booking._id);
        console.log('Form Data:', formData);

        try {
            // Update booking details
            await customFetch.patch(`/bookings/${data.booking._id}`, formData);

            // Send notification email
            await customFetch.post('/send-email', {
                receiverEmail: formData.email,
                subject: `Booking Status Updated for ${formData.serviceName}`,
                message: `Your booking for ${formData.serviceName} has been updated to ${formData.status}. 

            Details of your booking:
            - Service: ${formData.serviceName}
            - Status: ${formData.status}
            - Customer Name: ${formData.customerName}
            - Bike Model: ${formData.bikeModel}

            We are grateful for your choice of our bike service. Thanks for visiting our shop. We look forward to serving you again!

            Best regards,
            The Bike Service Team`,
            });

            toast.success('Booking updated successfully!');
            navigate('/admin/bookings');
        } catch (error) {
            console.error('Error updating booking:', error);
            toast.error('Failed to update booking.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div>
            <AdminNavbar propName="Update Status" />
            <AdminContainer>
                <Box sx={{
                    display: 'flex', gap: '2%', padding: '2%', '@media (max-width: 600px)': {
                        flexDirection: 'column'
                    }
                }}>
                    {/* Left Box - Form */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Typography variant="h4" gutterBottom>
                            Edit Booking
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Customer Name"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                InputProps={{ readOnly: true }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Service Name"
                                name="serviceName"
                                value={formData.serviceName}
                                onChange={handleChange}
                                required
                                InputProps={{ readOnly: true }}
                            />
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    label="Status"
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Ready for delivery">Ready for Delivery</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Notification Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                InputProps={{ readOnly: true }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{ mt: 2, background: '#FF5A6F', '&:hover': { background: '#FF5A6F' } }}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Booking'}
                            </Button>
                        </Box>
                    </Box>

                    {/* Right Box - Content and Image */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Booking Details
                        </Typography>
                        <img
                            src={img} // Assuming the image URL is part of the data
                            alt="Booking Image"
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <Typography variant="body1" sx={{ textAlign: 'center' }} gutterBottom>
                            Here you can update or modify the status of bookings alone and can't change any other details of the customer.
                        </Typography>
                    </Box>
                </Box>
            </AdminContainer>
        </div>
    );
};

export default AdminEditBooking;

