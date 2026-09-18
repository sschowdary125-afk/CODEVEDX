function FilterTabs({ currentFilter, onFilterChange }) {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div className="filter-tabs">
      {filters.map((filter) => (
        <button
          key={filter}
          className={currentFilter === filter ? "active" : ""}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;