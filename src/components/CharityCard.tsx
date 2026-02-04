import type { Charity } from '../types/charity';
import { CATEGORIES } from '../types/charity';
import './CharityCard.css';

interface CharityCardProps {
  charity: Charity;
}

export function CharityCard({ charity }: CharityCardProps) {
  const categoryInfo = CATEGORIES.find((c) => c.id === charity.category);

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="charity-card">
      <div className="charity-header">
        <h3 className="charity-name">{charity.name}</h3>
        <span className="charity-category">
          {categoryInfo?.icon} {categoryInfo?.label}
        </span>
      </div>
      <p className="charity-description">{charity.description}</p>
      <div className="charity-footer">
        <div className="charity-info">
          <span className="charity-rating" aria-label={`Rating: ${charity.rating} out of 5 stars`}>
            {renderStars(charity.rating)}
          </span>
          <span className="charity-location">{charity.location}</span>
        </div>
        <a
          href={charity.website}
          target="_blank"
          rel="noopener noreferrer"
          className="charity-link"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
}
