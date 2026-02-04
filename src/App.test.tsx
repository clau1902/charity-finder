import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('Charity Finder')).toBeInTheDocument();
    expect(screen.getByText('Find the perfect charity that matches your interests')).toBeInTheDocument();
  });

  it('renders category selector', () => {
    render(<App />);
    expect(screen.getByText('Select Your Interests')).toBeInTheDocument();
  });

  it('renders search bar', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search charities by name...')).toBeInTheDocument();
  });

  it('shows all charities initially', () => {
    render(<App />);
    expect(screen.getByText(/Showing 20 charities/)).toBeInTheDocument();
  });

  it('filters charities when category is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByText('Environment'));

    expect(screen.getByText(/Showing 3 charities/)).toBeInTheDocument();
  });

  it('filters charities when search query is entered', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('textbox'), 'ocean');

    expect(screen.getByText('Ocean Cleanup Foundation')).toBeInTheDocument();
    expect(screen.getByText(/Showing 1 charity/)).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<App />);
    expect(screen.getByText('Make a difference today. Every donation counts.')).toBeInTheDocument();
  });
});
