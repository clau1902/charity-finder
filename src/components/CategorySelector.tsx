import type { Category, CategoryInfo } from '../types/charity';
import { CATEGORIES } from '../types/charity';
import './CategorySelector.css';

interface CategorySelectorProps {
  selectedCategories: Category[];
  onToggleCategory: (category: Category) => void;
}

export function CategorySelector({ selectedCategories, onToggleCategory }: CategorySelectorProps) {
  return (
    <div className="category-selector">
      <h2>Select Your Interests</h2>
      <div className="category-grid">
        {CATEGORIES.map((cat: CategoryInfo) => (
          <button
            key={cat.id}
            className={`category-button ${selectedCategories.includes(cat.id) ? 'selected' : ''}`}
            onClick={() => onToggleCategory(cat.id)}
            aria-pressed={selectedCategories.includes(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
