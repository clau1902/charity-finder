import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search charities by name...')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    render(<SearchBar value="test query" onChange={() => {}} />);
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'ocean');

    expect(onChange).toHaveBeenCalledTimes(5); // once for each character
    expect(onChange).toHaveBeenLastCalledWith('n');
  });

  it('has accessible label', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Search charities')).toBeInTheDocument();
  });
});
