import React from 'react';
import { render, screen } from '@testing-library/react';
import SuccessPage from '../components/SuccessPage';

describe('SuccessPage', () => {
    it('renders success message', () => {
        render(<SuccessPage />);
        
        expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
        expect(screen.getByText(/our representative will get back to you shortly/i)).toBeInTheDocument();
        expect(screen.getByAltText(/image/i)).toBeInTheDocument();
    });
});
