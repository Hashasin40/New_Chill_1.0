import { useState } from "react";

const NavbarSearch = () => {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      {/* Desktop Search */}
      <form className="d-none d-md-flex me-3" role="search">
        <input
          className="form-control form-control-sm me-2 bg-dark text-white border-secondary rounded-pill"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-light btn-sm rounded-pill" type="submit">
          Search
        </button>
      </form>

      {/* Mobile Search (icon only) */}
      <div className="d-flex d-md-none m-0">
        <button
          className="btn btn-dark m-0 p-0"
          onClick={() => setShowInput(!showInput)}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Mobile Search Input (toggle muncul) */}
      {showInput && (
        <form className="d-flex d-md-none w-100 mt-2" role="search">
          <input
            className="form-control form-control-sm me-2 bg-dark text-white border-secondary rounded-pill"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light btn-sm rounded-pill" type="submit">
            Go
          </button>
        </form>
      )}
    </>
  );
};

export default NavbarSearch;
