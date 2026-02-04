import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharityCard } from './CharityCard';
import type { Charity } from '../types/charity';

const mockCharity: Charity = {
  id: '1',
  name: 'Test Charity',
  description: 'A charity for testing purposes',
  category: 'environment',
  rating: 4,
  website: 'https://testcharity.org',
  location: 'Test City, USA',
};

describe('CharityCard', () => {
  it('renders charity name', () => {
    render(<CharityCard charity={mockCharity} />);
    expect(screen.getByText('Test Charity')).toBeInTheDocument();
  });

  it('renders charity description', () => {
    render(<CharityCard charity={mockCharity} />);
    expect(screen.getByText('A charity for testing purposes')).toBeInTheDocument();
  });

  it('renders charity location', () => {
    render(<CharityCard charity={mockCharity} />);
    expect(screen.getByText('Test City, USA')).toBeInTheDocument();
  });

  it('renders category with icon', () => {
    render(<CharityCard charity={mockCharity} />);
    expect(screen.getByText(/Environment/)).toBeInTheDocument();
  });

  it('renders star rating', () => {
    render(<CharityCard charity={mockCharity} />);
    const ratingElement = screen.getByLabelText('Rating: 4 out of 5 stars');
    expect(ratingElement).toBeInTheDocument();
    expect(ratingElement.textContent).toBe('★★★★☆');
  });

  it('renders website link with correct attributes', () => {
    render(<CharityCard charity={mockCharity} />);
    const link = screen.getByRole('link', { name: 'Visit Website' });
    expect(link).toHaveAttribute('href', 'https://testcharity.org');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders correct number of filled stars based on rating', () => {
    const charity5Stars = { ...mockCharity, rating: 5 };
    const { rerender } = render(<CharityCard charity={charity5Stars} />);
    expect(screen.getByLabelText('Rating: 5 out of 5 stars').textContent).toBe('★★★★★');

    const charity1Star = { ...mockCharity, rating: 1 };
    rerender(<CharityCard charity={charity1Star} />);
    expect(screen.getByLabelText('Rating: 1 out of 5 stars').textContent).toBe('★☆☆☆☆');
  });
});
