import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const clearInput = () => {
    onChange(""); // Reset the input value
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search kimonos..."
      />
      {value && (
        <FontAwesomeIcon icon={faTimes} onClick={clearInput} className="clear-icon" />
      )}
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
};

export default SearchBar;
