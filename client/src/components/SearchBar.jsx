import { useEffect, useState } from 'react';

function Search({ value = '', onSearch }) {
  const [inputValue, setInputValue] = useState(value);

  // Sync when parent value changes (e.g., clicking tags)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounce search on input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(inputValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, onSearch]);

  return (
    <div className="search-container">
      <label htmlFor="search-input">ค้นหาที่เที่ยว</label><br />
      <input
        id="search-input"
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default Search;