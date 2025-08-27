import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import "../../../css/navbarsearch.css";

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-wrapper")) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showInput) {
      document.querySelector("#mobile-search-input")?.focus();
    }
  }, [showInput]);

  useEffect(() => {
    const input = document.querySelector("#mobile-search-input");
    const dropdownMenu = document.querySelector(".navbar-profile-dropdown .dropdown-menu");

    const closeDropdown = () => {
      dropdownMenu?.classList.remove("show");
    };

    input?.addEventListener("focus", closeDropdown);
    return () => input?.removeEventListener("focus", closeDropdown);
  }, []);

  const renderResults = () => {
    if (!query.trim()) return null;

    return (
      <ul className="list-group position-absolute top-100 start-0 w-100 z-3 mt-1">
        {loading ? (
          <li className="list-group-item bg-dark text-white">Loading...</li>
        ) : results.length > 0 ? (
          results.map((item) => (
            <li key={item.id} className="list-group-item custom-bg-results text-white d-flex align-items-center border-secondary">
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
          className="form-control form-control-sm navbar-search-input bg-dark text-white border-secondary rounded-pill"
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
          onClick={() => setShowInput(true)}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {showInput && (
        <div className="mobile-search-overlay position-fixed top-0 start-0 w-100 h-100 p-3">
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-sm btn-outline-light me-2 rounded-circle" onClick={() => setShowInput(false)}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <h5 className="text-white m-0">Search Posters</h5>
          </div>
          <div className="search-wrapper position-relative">
            <input
              id="mobile-search-input"
              className="form-control form-control-sm navbar-search-input bg-dark text-white border-secondary rounded-pill mb-2"
              type="search"
              placeholder="Search poster..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {renderResults()}
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarSearch;
