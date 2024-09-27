import React, { useState } from 'react';
import { TextField, Button, Typography, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7f60d4',
        },
        secondary: {
            main: '#5e45a0',
        },
        background: {
            default: '#f5f3ff',
            paper: '#ffffff',
        },
    },
});

const API_BASE_URL = 'https://yourbenchmark.onrender.com';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email.trim() || !password.trim()) {
            setErrorMessage('Email and password are required');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim()
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Store the token and user info in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Navigate to home page after successful login
            navigate('/');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
                <div style={{ maxWidth: '400px' }}>
                    <Typography sx={{ color: theme.palette.primary.main }} variant="h3">Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="new-email"
                            inputProps={{
                                autoComplete: 'new-email',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="new-password"
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </form>
                    {errorMessage && (
                        <Typography color="error" style={{ marginTop: '1rem' }}>
                            {errorMessage}
                        </Typography>
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default LoginPage;
