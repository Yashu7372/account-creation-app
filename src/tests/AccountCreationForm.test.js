import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import AccountCreationForm from '../components/AccountCreationForm';

jest.mock('axios');

describe('AccountCreationForm', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AccountCreationForm />
            </MemoryRouter>
        );
    });

    it('renders the account creation form with all fields', () => {
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/terms and privacy/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('handles input changes', () => {
        fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        expect(screen.getByLabelText(/full name/i).value).toBe('John Doe');
        expect(screen.getByLabelText(/email address/i).value).toBe('john@example.com');
        expect(screen.getByLabelText(/password/i).value).toBe('password123');
    });

    it('validates the form and displays error on submission failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Failed to create account'));

        fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByLabelText(/terms and privacy/i));

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        expect(await screen.findByText(/an error occurred while creating the account/i)).toBeInTheDocument();
    });

    it('sends the correct data in the POST request and navigates to the success page', async () => {
        // Mock the axios POST request and capture the resolved value
        const mockResponse = { status: 200 };
        axios.post.mockResolvedValueOnce(mockResponse);
    
        // Simulate user input for the form fields
        fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByLabelText(/terms and privacy/i)); // Check the terms and privacy checkbox
    
        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
        // Wait for the form submission to be processed
        await screen.findByRole('button', { name: /sign up/i });
    
        // Assert that the correct data was sent in the POST request
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/accounts/users', {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            termsAccepted: true,
        });
    
    });
    
});
