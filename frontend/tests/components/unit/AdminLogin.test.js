import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AdminLogin from '../../../src/components/admin/AdminLogin';
import axiosMock from 'axios';
import { store } from '../../../src/redux/store';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
    push: jest.fn(),
    }),
}));

describe('Admin Login Page', () => {
    beforeEach(() => {
        render(<Provider store={store}>
            <AdminLogin />
            </Provider>);
    });

    it('renders the login form', () => {
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('updates email and password fields on user input', () => {
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'admin@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' },
        });

        expect(screen.getByPlaceholderText('Email').value).toBe('admin@example.com');
        expect(screen.getByPlaceholderText('Password').value).toBe('password123');
    });

    it('sends a login request when form is submitted', async () => {
        axiosMock.post.mockResolvedValueOnce({
            data: { message: 'Login successful' },
        });

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'admin@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(axiosMock.post).toHaveBeenCalledWith('/api/admin/login', {
                email: 'admin@example.com',
                password: 'password123',
            });
        });
    });

    it('shows error message on login failure', async () => {
        const errorMessage = 'Invalid credentials';
        axiosMock.post.mockRejectedValueOnce(new Error(errorMessage));

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'wrongpassword' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    // Tambahkan lebih banyak tes sesuai kebutuhan
});
