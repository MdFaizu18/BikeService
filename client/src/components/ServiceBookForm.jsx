import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ServiceBookForm = ({ user, service }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        receiverEmail: "mohammed17092002@gmail.com",
        subject: `Got a new message from Bike Services - (${service?.serviceName})`,
        message: '',
    });

    const [data, setData] = useState({
        serviceName: service?.serviceName || '',
        price:service?.price || '',
        customerName: user?.userName || '',
        email: user?.email || '',
        bikeModel: '',
        mobileNo: user?.mobileNo || '',
        bookingDate: '',
        status: 'Pending',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => {
            const updatedData = { ...prevData, [name]: value };

            // Update message in the form state when data changes
            setForm((prevForm) => ({
                ...prevForm,
                message: `
                Hey Buddy!! Got a new customer just have a look on their details ...

                Customer Name: ${updatedData.customerName}
                Service Name: ${updatedData.serviceName}
                Mobile Number: ${updatedData.mobileNo}
                Bike Model: ${updatedData.bikeModel}
                Booking Date: ${updatedData.bookingDate}
                `,
            }));

            return updatedData;
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!data.customerName) errors.customerName = 'Customer Name is required';
        if (!data.bikeModel) errors.bikeModel = 'Bike Model is required';
        if (!data.mobileNo) errors.mobileNo = 'Mobile Number is required';
        if (!data.bookingDate) errors.bookingDate = 'Booking Date is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Send email
            await customFetch.post('/send-email', form);

            // Save booking details in the database
            await customFetch.post('/bookings', data);

            toast.success('Service booked successfully!');
            setForm({
                receiverEmail: import.meta.env.VITE_RECEIVER_EMAIL || '',
                subject: '',
                message: '',
            });
            setData({
                serviceName: service?.serviceName || '',
                customerName: '',
                bikeModel: '',
                mobileNo: '',
                email:'',
                price:'',
                bookingDate: '',
                status: 'pending',
            });
            setFormErrors({});
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to book the service.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: '5%' ,
            '@media (max-width: 600px)': {
               flexDirection:'column',
               marginTop:'-15%'
            }}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '500px', gap: '10px' }}>
                <Box>
                    <img src={service.image} alt="" width={400} height={300} style={{ borderRadius: '20px' }} />
                </Box>
                <Box>
                    <Typography variant='h5'>{service.serviceName}</Typography>
                </Box>
                <Box sx={{
                    width: '450px', '@media (max-width: 600px)': {
                        width:'360px'
                    } }}>
                    <Typography variant='h6' sx={{ fontWeight: '500', color: 'grey', textAlign: 'center', lineHeight: '20px' }}>{service.description}</Typography>
                </Box>
                <Box>
                    <Typography variant='h6' sx={{ fontWeight: '500', color: 'white', background: 'grey', textAlign: 'center', padding: '5px 15px', borderRadius: '10px' }}>₹{service.price}</Typography>
                </Box>
            </Box>
            <Box sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
                <Typography variant="h4" gutterBottom>
                    Book a Service
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Recipient's Email"
                        name="receiverEmail"
                        value={form.receiverEmail}
                        onChange={(e) => setForm({ ...form, receiverEmail: e.target.value })}
                        required
                        sx={{ display: 'none' }}
                    />
                    <TextField
                        name="price"
                        value={data.price}
                        onChange={(e) => setData({ ...form, price: e.target.value })}
                        required
                        sx={{ display: 'none' }}
                    />
                    <TextField
                        name="email"
                        value={data.email}
                        onChange={(e) => setData({ ...form, email: e.target.value })}
                        required
                        sx={{ display: 'none' }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Customer Name"
                        name="customerName"
                        value={data.customerName}
                        onChange={handleChange}
                        required
                        error={!!formErrors.customerName}
                        helperText={formErrors.customerName}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Bike Model"
                        name="bikeModel"
                        value={data.bikeModel}
                        onChange={handleChange}
                        required
                        error={!!formErrors.bikeModel}
                        helperText={formErrors.bikeModel}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mobile Number"
                        name="mobileNo"
                        value={data.mobileNo}
                        onChange={handleChange}
                        required
                        error={!!formErrors.mobileNo}
                        helperText={formErrors.mobileNo}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Booking Date"
                        name="bookingDate"
                        type="date"
                        value={data.bookingDate}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!formErrors.bookingDate}
                        helperText={formErrors.bookingDate}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Message"
                        name="message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        multiline
                        rows={4}
                        sx={{ display: 'none' }} // Hide this field
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ mt: 2, padding: '5px 30px', background: '#FF5A6F', '&:hover': { background: '#FF5A6F' } }}
                    >
                        {isSubmitting ? 'Booking...' : 'Book'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ServiceBookForm;



