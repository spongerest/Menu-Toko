import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../redux/adminSlice';
import axios from 'axios';
import './AdminLogin.module.scss';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/admin/login', { email, password });
            dispatch(adminLogin(response.data)); // Kirim data ke Redux store
            // Redirect ke dashboard admin
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || 'Login failed'); // Tampilkan pesan error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AdminLogin;
