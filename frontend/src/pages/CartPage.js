import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, ButtonGroup, Paper, Grid, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, InputAdornment } from '@mui/material';
import { updateItemQuantity, removeFromCart, resetCart } from '../redux/cartSlice';

const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
};

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <Paper elevation={2} sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
        }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>{item.name}</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <ButtonGroup size="small" sx={{ mr: 2 }}>
                    <Button onClick={() => onUpdateQuantity(item.id, Math.max(item.quantity - 1, 0))}>-</Button>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <Button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                </ButtonGroup>
                <Typography variant="body1" sx={{ minWidth: '100px', textAlign: 'right' }}>
                    {formatRupiah(item.price * item.quantity)}
                </Typography>
                <Button variant="outlined" color="error" sx={{ ml: 2 }} onClick={() => onRemove(item.id)}>Remove</Button>
            </Box>
        </Paper>
    );
};


const paymentMethods = [
    { name: 'Cash', id: 'cash' },
    { name: 'Debit Card', id: 'debit_card' },
    { name: 'DANA', id: 'dana' },
    { name: 'OVO', id: 'ovo' },
    { name: 'GoPay', id: 'gopay' },
    { name: 'ShopeePay', id: 'shopeepay' },
];


const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const [paidAmount, setPaidAmount] = useState('');
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [change, setChange] = useState(0);

    const handleUpdateQuantity = (id, newQuantity) => {
        dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handlePaymentMethodSelect = (methodId) => {
        if (methodId === 'cash') {
            setOpenPaymentDialog(true);
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePayment = () => {
        const calculatedChange = paidAmount - totalPrice;
        if (calculatedChange < 0) {
            alert('Uang yang dibayarkan tidak cukup.');
        } else {
            setChange(calculatedChange);
            setOpenPaymentDialog(false);
            setOpenConfirmationDialog(true);
        }
    };

    const handlePrintReceipt = () => {
        window.print();
        resetCartPage();
    };

    const resetCartPage = () => {
        dispatch(resetCart());
        setOpenConfirmationDialog(false);
        setPaidAmount('');
    };





    return (
        <Container maxWidth="lg">
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>Your Cart</Typography>
                <Grid container spacing={2}>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <CartItem 
                                    item={item} 
                                    onUpdateQuantity={handleUpdateQuantity} 
                                    onRemove={handleRemoveItem}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Typography>Your cart is empty.</Typography>
                    )}
                </Grid>
                <Typography variant="h5" sx={{ mt: 3 }}>Total: {formatRupiah(totalPrice)}</Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>Payment Method:</Typography>
                <ButtonGroup variant="outlined" sx={{ mt: 1, flexWrap: 'wrap' }}>
                    {paymentMethods.map(method => (
                        <Button key={method.id} onClick={() => handlePaymentMethodSelect(method.id)}>
                            {method.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
            <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)}>
                <DialogTitle>Masukkan Jumlah Pembayaran</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="paidAmount"
                        label="Jumlah Pembayaran"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={paidAmount}
                        onChange={(e) => setPaidAmount(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPaymentDialog(false)}>Batal</Button>
                    <Button onClick={handlePayment} color="primary">
                        Bayar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openConfirmationDialog} onClose={() => setOpenConfirmationDialog(false)}>
                <DialogTitle>Pembayaran Berhasil</DialogTitle>
                <DialogContent>
                    {cart.map((item, index) => (
                        <Typography key={index}>
                            {item.name} x {item.quantity} = {formatRupiah(item.price * item.quantity)}
                        </Typography>
                    ))}
                    <DialogContentText>
                        Total Belanja: {formatRupiah(totalPrice)}<br />
                        Jumlah Dibayar: {formatRupiah(paidAmount)}<br />
                        Kembalian: {formatRupiah(change)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <div className="print-hide">
                    <Button onClick={handlePrintReceipt}>Cetak Struk</Button>
                    <Button onClick={resetCartPage}>Kembali ke Menu</Button>
                </div>
                </DialogActions>
            </Dialog>
        </Container>
        );
};

export default CartPage;
