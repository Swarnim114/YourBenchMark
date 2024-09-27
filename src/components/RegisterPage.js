import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Snackbar, Alert, ThemeProvider, createTheme } from '@mui/material';

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

// Hardcoded API base URL
const API_BASE_URL = 'http://localhost:5000';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Use effect to clear form fields on component mount
    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();

            // Show success message in Snackbar
            setSuccessMessage('Registration successful! Redirecting to login...');
            setOpenSnackbar(true);

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = '/login'; // Assuming you have a login page at /login
            }, 2000);

        } catch (err) {
            setErrorMessage(err.message);
            setOpenSnackbar(true);
        }
    };

    // Handle closing of Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
                <div style={{ maxWidth: '400px' }}>
                    <Typography sx={{ color: theme.palette.primary.main }} variant="h3">Register</Typography>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="new-name"
                            inputProps={{
                                autoComplete: 'new-name',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                        />
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
                            Register
                        </Button>
                    </form>

                    {/* Snackbar for displaying success or error messages */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={4000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        {errorMessage ? (
                            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                                {errorMessage}
                            </Alert>
                        ) : (
                            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                                {successMessage}
                            </Alert>
                        )}
                    </Snackbar>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default RegisterPage;
