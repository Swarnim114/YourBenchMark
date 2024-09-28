import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, ThemeProvider, createTheme, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

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
const API_BASE_URL = 'https://yourbenchmark.onrender.com';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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

            // Show success message in Snackbar
            navigate('/login'); // Redirect to login page after successful registration

        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.default,
                    padding: { xs: 2, sm: 3, md: 4 }
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: { xs: '100%', sm: '400px' },
                        p: { xs: 2, sm: 3, md: 4 },
                        boxShadow: 3,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color: theme.palette.primary.main,
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                            textAlign: 'center',
                            mb: 3
                        }}
                        variant="h3"
                    >
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="new-name"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="new-email"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="new-password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, py: 1.5, fontSize: '1rem' }}
                        >
                            Register
                        </Button>
                    </form>
                    {errorMessage && (
                        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Already a user?{' '}
                            <Link component={RouterLink} to="/login" color="primary">
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default RegisterPage;
