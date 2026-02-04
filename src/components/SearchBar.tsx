import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search charities by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search charities"
      />
    </div>
  );
}
