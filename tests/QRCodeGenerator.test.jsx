import React from 'react';
import { render, screen } from '@testing-library/react';
import QRCodeGenerator from '../src/components/QRCodeGenerator';

describe('QRCodeGenerator', () => {
  it('renders the component', () => {
    render(<QRCodeGenerator />);
    expect(screen.getByText('URL')).toBeInTheDocument();
  });
});
