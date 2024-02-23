import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const menuItems = [
    {
        id: 1,
        name: 'Espresso',
        description: 'Rich and creamy espresso shot made from premium Arabica beans.',
        image: 'https://via.placeholder.com/150',
        price: 42000,
    },
    {
        id: 2,
        name: 'Classic Pancakes',
        description: 'Fluffy pancakes served with maple syrup, butter, and fresh berries.',
        image: 'https://via.placeholder.com/150',
        price: 105000,
    },
    {
        id: 3,
        name: 'Avocado Toast',
        description: 'Crunchy, whole grain toast topped with creamy avocado, poached egg, and chili flakes.',
        image: 'https://via.placeholder.com/150',
        price: 84000,
    },
];

const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
};

const UserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState(() => {
        const savedQuantities = JSON.parse(localStorage.getItem('quantities')) || {};
        return menuItems.reduce((acc, item) => ({
            ...acc,
            [item.id]: savedQuantities[item.id] || 0
        }), {});
    });

    useEffect(() => {
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [quantities]);
    

    const handleAddToCart = (item) => {
        const quantity = quantities[item.id];
        if (quantity > 0) {
        dispatch(addToCart({ ...item, quantity }));
        }
    };

    const handleQuantityChange = (id, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(prevQuantities[id] + delta, 0),
        }));
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>Explore Our Menu</Typography>
                <Grid container spacing={4}>
                    {menuItems.map((menuItem) => (
                        <Grid item key={menuItem.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia component="img" height="140" image={menuItem.image} alt={menuItem.name} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">{menuItem.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{menuItem.description}</Typography>
                                    <Typography variant="h6" color="primary">{formatRupiah(menuItem.price)}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleQuantityChange(menuItem.id, -1)}>-</Button>
                                    <Typography>{quantities[menuItem.id]}</Typography>
                                    <Button onClick={() => handleQuantityChange(menuItem.id, 1)}>+</Button>
                                    {quantities[menuItem.id] > 0 && (
                                        <Button size="small" onClick={() => handleAddToCart(menuItem)}>Add to Cart</Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => navigate('/')}>Back to Home</Button>
                <Button variant="contained" color="secondary" sx={{ mt: 1, ml: 2 }} onClick={() => navigate('/cart')}>View Cart</Button>
            </Box>
        </Container>
    );
};
    
    export default UserPage;