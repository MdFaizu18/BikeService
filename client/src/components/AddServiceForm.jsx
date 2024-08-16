import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import customFetch from '../utils/customFetch'; // Ensure this is set up for multipart/form-data
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { toast } from 'react-toastify';

const MAX_FILE_SIZE_MB = 5; 

const AddServiceForm = () => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
    const [uploading, setUploading] = useState(false); // State to check if uploading
    const navigate = useNavigate();

   const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check file size
            const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
            if (fileSizeMB > MAX_FILE_SIZE_MB) {
                toast.error('Only images up to 5 MB are accepted.');
                setImageFile(null); // Clear the file input
                return;
            }

            setImageFile(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUploading(true);
        setUploadProgress(0); // Reset progress to 0 on new upload

        const formData = new FormData();
        formData.append('serviceName', serviceName);
        formData.append('description', description);
        formData.append('price', price);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await customFetch.post('/services', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    // Calculate and set the upload progress
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                }
            });

            // Clear the form inputs
            setServiceName('');
            setDescription('');
            setPrice('');
            setImageFile(null);
            setUploadProgress(100); // Set progress to 100% on completion

            toast.success('Service added successfully!');
            navigate('/admin');
        } catch (error) {
            console.error('Error adding service:', error);
            toast.error('Failed to add service.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ p: 0, marginRight: '0%'}}>
            <Typography variant="h4" gutterBottom >
                Add New Service
            </Typography>
            <Paper sx={{ p: 3, mb: 3, margin: '0 5% 0 0%' }}>
                <form onSubmit={handleSubmit}>
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
                            <Box>*File size upto 5 MB should be accepted</Box>
                            {imageFile && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2">Selected Image: {imageFile.name}</Typography>
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
                                Add Service
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddServiceForm;
