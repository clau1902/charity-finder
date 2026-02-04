import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategorySelector } from './CategorySelector';
import { CATEGORIES } from '../types/charity';

describe('CategorySelector', () => {
  it('renders all category buttons', () => {
    render(
      <CategorySelector selectedCategories={[]} onToggleCategory={() => {}} />
    );

    CATEGORIES.forEach((category) => {
      expect(screen.getByText(category.label)).toBeInTheDocument();
    });
  });

  it('marks selected categories with selected class', () => {
    render(
      <CategorySelector
        selectedCategories={['environment', 'health']}
        onToggleCategory={() => {}}
      />
    );

    const environmentButton = screen.getByText('Environment').closest('button');
    const healthButton = screen.getByText('Health').closest('button');
    const educationButton = screen.getByText('Education').closest('button');

    expect(environmentButton).toHaveClass('selected');
    expect(healthButton).toHaveClass('selected');
    expect(educationButton).not.toHaveClass('selected');
  });

  it('calls onToggleCategory when a button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <CategorySelector selectedCategories={[]} onToggleCategory={onToggle} />
    );

    await user.click(screen.getByText('Environment'));

    expect(onToggle).toHaveBeenCalledWith('environment');
  });

  it('has correct aria-pressed attributes', () => {
    render(
      <CategorySelector
        selectedCategories={['environment']}
        onToggleCategory={() => {}}
      />
    );

    const environmentButton = screen.getByText('Environment').closest('button');
    const educationButton = screen.getByText('Education').closest('button');

    expect(environmentButton).toHaveAttribute('aria-pressed', 'true');
    expect(educationButton).toHaveAttribute('aria-pressed', 'false');
  });
});
