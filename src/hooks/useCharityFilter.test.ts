import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCharityFilter } from './useCharityFilter';
import type { Charity } from '../types/charity';

const mockCharities: Charity[] = [
  {
    id: '1',
    name: 'Ocean Cleanup',
    description: 'Cleaning oceans from plastic',
    category: 'environment',
    rating: 5,
    website: 'https://example.com',
    location: 'Netherlands',
  },
  {
    id: '2',
    name: 'Education First',
    description: 'Providing education to children',
    category: 'education',
    rating: 4,
    website: 'https://example.com',
    location: 'USA',
  },
  {
    id: '3',
    name: 'Health Heroes',
    description: 'Medical aid worldwide',
    category: 'health',
    rating: 5,
    website: 'https://example.com',
    location: 'Switzerland',
  },
  {
    id: '4',
    name: 'Animal Rescue',
    description: 'Rescuing animals in need',
    category: 'animals',
    rating: 3,
    website: 'https://example.com',
    location: 'UK',
  },
];

describe('useCharityFilter', () => {
  it('returns all charities when no filters are applied', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: [],
        searchQuery: '',
      })
    );

    expect(result.current).toHaveLength(4);
  });

  it('filters charities by single category', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: ['environment'],
        searchQuery: '',
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Ocean Cleanup');
  });

  it('filters charities by multiple categories', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: ['environment', 'health'],
        searchQuery: '',
      })
    );

    expect(result.current).toHaveLength(2);
    expect(result.current.map((c) => c.category)).toContain('environment');
    expect(result.current.map((c) => c.category)).toContain('health');
  });

  it('filters charities by search query (name)', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: [],
        searchQuery: 'ocean',
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Ocean Cleanup');
  });

  it('filters charities by search query (description)', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: [],
        searchQuery: 'medical',
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Health Heroes');
  });

  it('combines category and search filters', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: ['environment', 'education'],
        searchQuery: 'ocean',
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Ocean Cleanup');
  });

  it('returns empty array when no matches found', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: [],
        searchQuery: 'nonexistent',
      })
    );

    expect(result.current).toHaveLength(0);
  });

  it('sorts results by rating (highest first)', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: [],
        searchQuery: '',
      })
    );

    expect(result.current[0].rating).toBe(5);
    expect(result.current[result.current.length - 1].rating).toBe(3);
  });

  it('is case insensitive for search', () => {
    const { result } = renderHook(() =>
      useCharityFilter({
        charities: mockCharities,
        selectedCategories: [],
        searchQuery: 'OCEAN',
      })
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Ocean Cleanup');
  });
});
