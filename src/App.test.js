import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AccountCreationForm from "./components/AccountCreationForm";
import SuccessPage from './components/SuccessPage';

describe('App Routing', () => {
    it('renders AccountCreationForm by default', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText(/create account/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('renders SuccessPage when navigating to /success', () => {
        render(
            <MemoryRouter initialEntries={['/success']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
        expect(screen.getByText(/our representative will get back to you shortly/i)).toBeInTheDocument();
    });

    it('renders the correct component based on the route', () => {
        render(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Routes>
                    <Route path="/" element={<AccountCreationForm />} />
                    <Route path="/success" element={<SuccessPage />} />
                </Routes>
            </MemoryRouter>
        );

        // At the root route, AccountCreationForm should be rendered
        expect(screen.getByText(/create account/i)).toBeInTheDocument();

        // Navigate to /success
        render(
            <MemoryRouter initialEntries={['/success']} initialIndex={1}>
                <Routes>
                    <Route path="/" element={<AccountCreationForm />} />
                    <Route path="/success" element={<SuccessPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Now SuccessPage should be rendered
        expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
    });
});
