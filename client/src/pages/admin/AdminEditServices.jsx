import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import AdminNavbar from '../../components/AdminNavbar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AdminContainer } from '../../assets/wrappers/AdminWrapper';

// Assuming `userData` contains the service data from the API request
export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/services/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error.response.data.msg);
        return redirect('/admin');
    }
};

const AdminEditServices = () => {
    const userData = useLoaderData();
    const service = userData.service; // Ensure the structure of `userData` is correct
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState(null); // New state for file input
    const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
    const [uploading, setUploading] = useState(false); // State to check if uploading
    const navigate = useNavigate();

    useEffect(() => {
        // Populate form fields with data from userData
        if (service) {
            setServiceName(service.serviceName || '');
            setDescription(service.description || '');
            setPrice(service.price || '');
            setImage(service.image || '');
        }
    }, [service]);

    // to get the image from the cloudinary 
    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
        setImage(event.target.files[0].name); // Show the file name in the input field
    };

    // to update the service data in the server
    const handleSubmit = async (event) => {
        event.preventDefault();
        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('serviceName', serviceName);
        formData.append('description', description);
        formData.append('price', price);

        if (imageFile) {
            formData.append('image', imageFile); // Append the image file
        } else {
            formData.append('image', image); // Retain existing image URL if no new file is selected
        }

        try {
            // Send the updated data to the server
            await customFetch.patch(`/services/${service._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    // Calculate and set the upload progress
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                }
            });
            setUploadProgress(100);

            toast.success('Service updated successfully!');
            navigate('/admin/services');
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error('Failed to update service.');
        }
    };

    return (
        <>
            <AdminNavbar />
            <AdminContainer>
                <Box sx={{ p: 3, marginRight: '5%' }}>
                    <Typography variant="h4" gutterBottom>
                        Edit Service
                    </Typography>
                    <Paper sx={{ p: 3, mb: 3, margin: '0 5% 0 0%' }}>
                        <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* Updated encoding type */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Service Name"
                                        variant="outlined"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        variant="outlined"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={<PhotoCamera />}
                                    >
                                        Upload Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                    {image && (
                                        <Box sx={{
                                            mt: 2, '@media (max-width: 600px)': {
                                               display:'none'
                                            }}}>
                                            <Typography variant="body2">Selected Image: {image}</Typography>
                                        </Box>
                                    )}
                                </Grid>
                                {uploading && (
                                    <Grid item xs={12}>
                                        <Box sx={{ width: '100%', mt: 2 }}>
                                            <LinearProgress variant="determinate" value={uploadProgress} />
                                            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                                                {uploadProgress}%
                                            </Typography>
                                            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                                                Uploading... it will take some time to complete. Please wait.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit" sx={{ background: '#EF5A6F' }}>
                                        Update Service
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            </AdminContainer>
        </>
    );
};

export default AdminEditServices;
