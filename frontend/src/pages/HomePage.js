import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container } from '@mui/material';

const HomePage = () => {
    const navigate = useNavigate();

    return (
    <Container maxWidth="sm">
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Our Store
        </Typography>
        <Typography variant="body1" gutterBottom>
        Explore our products and manage everything from the admin dashboard.
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/admin/login')}>
        Admin Login
        </Button>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/user')}>
        View Products
        </Button>
        </Box>
    </Container>
    );
};

export default HomePage;
