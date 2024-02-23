import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container } from '@mui/material';


const AdminPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    React.useEffect(() => {
    if (!isAuthenticated) {
        navigate('/admin/login');
    }
}, [isAuthenticated, navigate]);

return (
    <Container maxWidth="sm">
    <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Home
        </Button>
    </Box>
    </Container>
);
};

export default AdminPage;
