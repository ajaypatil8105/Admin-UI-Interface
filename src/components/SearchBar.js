import React, { useState } from "react";

function SearchBar({ handleFilter }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    handleFilter(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, email, or role"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;

