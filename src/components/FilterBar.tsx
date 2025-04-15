import React from 'react';
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

interface FilterBarProps {
  timePeriod: string;
  onTimePeriodChange: (period: string) => void;
  sortDirection: 'asc' | 'desc';
  onSortChange: (direction: 'asc' | 'desc') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  timePeriod,
  onTimePeriodChange,
  sortDirection,
  onSortChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="time-filter-chips">
          {[
            { value: "all", label: "All Time" },
            { value: "1year", label: "Last Year" },
            { value: "6months", label: "6 Months" },
            { value: "3months", label: "3 Months" },
            { value: "1month", label: "1 Month" },
            { value: "today", label: "Today" },
          ].map((period) => (
            <button
              key={period.value}
              className={`time-chip ${timePeriod === period.value ? "active" : ""}`}
              onClick={() => onTimePeriodChange(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="sort-section">
        <button
          className={`sort-button ${sortDirection === 'asc' ? 'active' : ''}`}
          onClick={() => onSortChange('asc')}
        >
          <FontAwesomeIcon icon={faSortAmountUp} />
          <span>Price Low-High</span>
        </button>
        <button
          className={`sort-button ${sortDirection === 'desc' ? 'active' : ''}`}
          onClick={() => onSortChange('desc')}
        >
          <FontAwesomeIcon icon={faSortAmountDown} />
          <span>Price High-Low</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;