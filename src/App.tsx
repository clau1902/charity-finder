import { useState } from 'react';
import type { Category } from './types/charity';
import { charities } from './data/charities';
import { useCharityFilter } from './hooks/useCharityFilter';
import { CategorySelector } from './components/CategorySelector';
import { SearchBar } from './components/SearchBar';
import { CharityList } from './components/CharityList';
import './App.css';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharities = useCharityFilter({
    charities,
    selectedCategories,
    searchQuery,
  });

  const handleToggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Charity Finder</h1>
        <p>Find the perfect charity that matches your interests</p>
      </header>

      <main className="app-main">
        <CategorySelector
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
        />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <CharityList charities={filteredCharities} />
      </main>

      <footer className="app-footer">
        <p>Make a difference today. Every donation counts.</p>
      </footer>
    </div>
  );
}

export default App;
