import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import rakbankImage from "./rakbank.png";

const AccountCreationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        termsAccepted: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/users', formData);
            if (response.status === 200) {
                navigate('/success'); 
            }
        } catch (err) {
            setError('An error occurred while creating the account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, margin: 'auto', paddingTop: 10 }}>
            <img src={rakbankImage} alt="Image" width={300} height={200} />
            <Typography variant="h5" gutterBottom>
                Create Account
            </Typography>
            <TextField
                label="Full Name"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                inputProps={{ maxLength: 50 }}
                required
            />
            <TextField
                label="Email Address"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
            />
            <TextField
                label="Password"
                name="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                type="password"
                inputProps={{ minLength: 8, pattern: "^[A-Za-z0-9]+$" }}
                required
            />
            <FormControlLabel
                control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />}
                label="I agree with Terms and Privacy"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? 'Submitting...' : 'Sign Up'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
};

export default AccountCreationForm;
