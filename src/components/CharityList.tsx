import type { Charity } from '../types/charity';
import { CharityCard } from './CharityCard';
import './CharityList.css';

interface CharityListProps {
  charities: Charity[];
}

export function CharityList({ charities }: CharityListProps) {
  if (charities.length === 0) {
    return (
      <div className="charity-list-empty">
        <p>No charities found. Try selecting different categories or adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="charity-list">
      <p className="results-count">
        Showing {charities.length} {charities.length === 1 ? 'charity' : 'charities'}
      </p>
      <div className="charity-grid">
        {charities.map((charity) => (
          <CharityCard key={charity.id} charity={charity} />
        ))}
      </div>
    </div>
  );
}
