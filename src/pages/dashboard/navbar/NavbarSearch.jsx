import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";

// Custom debounce hook
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query);

  // Fetch and filter search results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axiosInstance
      .get("/posters")
      .then((res) => {
        const filtered = res.data
          .filter((item) => {
            const text = item.searchText?.toLowerCase() || "";
            return text.includes(debouncedQuery.toLowerCase());
          })
          .sort((a, b) => b.searchBoost - a.searchBoost);
        setResults(filtered);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-wrapper")) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus mobile input
  useEffect(() => {
    if (showInput) {
      document.querySelector("#mobile-search-input")?.focus();
    }
  }, [showInput]);

  const renderResults = () => {
    if (!query.trim()) return null;

    return (
      <ul className="list-group position-absolute top-100 start-0 w-100 z-3 mt-1">
        {loading ? (
          <li className="list-group-item bg-dark text-white">Loading...</li>
        ) : results.length > 0 ? (
          results.map((item) => (
            <li key={item.id} className="list-group-item bg-dark text-white d-flex align-items-center">
              <img src={item.poster} alt={item.title} width={30} className="me-2 rounded" />
              {item.title}
            </li>
          ))
        ) : (
          <li className="list-group-item bg-dark text-white">No results found.</li>
        )}
      </ul>
    );
  };

  return (
    <>
      {/* Desktop Search */}
      <div className="search-wrapper position-relative d-none d-md-flex me-3">
        <input
          className="form-control form-control-sm me-2 bg-dark text-white border-secondary rounded-pill"
          type="search"
          placeholder="Search poster..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-light btn-sm rounded-pill" type="submit">
          Search
        </button>
        {renderResults()}
      </div>

      {/* Mobile Search Toggle */}
      <div className="d-flex d-md-none m-0">
        <button
          className="btn btn-dark m-0 p-0"
          onClick={() => setShowInput(!showInput)}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Mobile Search Input */}
      {showInput && (
        <div className="search-wrapper position-relative d-flex d-md-none w-100 mt-2">
          <input
            id="mobile-search-input"
            className="form-control form-control-sm me-2 bg-dark text-white border-secondary rounded-pill"
            type="search"
            placeholder="Search poster..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-light btn-sm rounded-pill" type="submit">
            Go
          </button>
          {renderResults()}
        </div>
      )}
    </>
  );
};

export default NavbarSearch;
