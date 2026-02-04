import { useMemo } from 'react';
import type { Charity, Category } from '../types/charity';

interface UseCharityFilterOptions {
  charities: Charity[];
  selectedCategories: Category[];
  searchQuery: string;
}

export function useCharityFilter({
  charities,
  selectedCategories,
  searchQuery,
}: UseCharityFilterOptions): Charity[] {
  return useMemo(() => {
    let filtered = charities;

    // Filter by categories (if any selected)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((charity) =>
        selectedCategories.includes(charity.category)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (charity) =>
          charity.name.toLowerCase().includes(query) ||
          charity.description.toLowerCase().includes(query)
      );
    }

    // Sort by rating (highest first)
    return [...filtered].sort((a, b) => b.rating - a.rating);
  }, [charities, selectedCategories, searchQuery]);
}
