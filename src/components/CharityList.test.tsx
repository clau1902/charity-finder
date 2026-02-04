import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharityList } from './CharityList';
import type { Charity } from '../types/charity';

const mockCharities: Charity[] = [
  {
    id: '1',
    name: 'Charity One',
    description: 'First charity',
    category: 'environment',
    rating: 5,
    website: 'https://one.org',
    location: 'USA',
  },
  {
    id: '2',
    name: 'Charity Two',
    description: 'Second charity',
    category: 'education',
    rating: 4,
    website: 'https://two.org',
    location: 'UK',
  },
];

describe('CharityList', () => {
  it('renders all charities', () => {
    render(<CharityList charities={mockCharities} />);
    expect(screen.getByText('Charity One')).toBeInTheDocument();
    expect(screen.getByText('Charity Two')).toBeInTheDocument();
  });

  it('shows correct count for multiple charities', () => {
    render(<CharityList charities={mockCharities} />);
    expect(screen.getByText('Showing 2 charities')).toBeInTheDocument();
  });

  it('shows singular form for one charity', () => {
    render(<CharityList charities={[mockCharities[0]]} />);
    expect(screen.getByText('Showing 1 charity')).toBeInTheDocument();
  });

  it('shows empty state when no charities', () => {
    render(<CharityList charities={[]} />);
    expect(
      screen.getByText(/No charities found/)
    ).toBeInTheDocument();
  });
});
