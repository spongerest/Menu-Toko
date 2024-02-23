import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../redux/adminSlice';
import axios from 'axios';
import styles from './AdminLogin.module.scss';
import { Typography, Alert  } from '@mui/material';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { email, password });
            dispatch(adminLogin(response.data));
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response.data.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['admin-login']}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '20px' }}>Admin Login</Typography>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                    type="email" 
                    className={styles.input}
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    className={styles.input}
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </div>
    );
};

export default AdminLogin;
