import { useEffect } from "react";
import * as bootstrap from "bootstrap";
import NavbarIcon from "./NavbarIcon";
import NavbarLinks from "./NavbarLinks";
import NavbarProfile from "./ProfileDropDown";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  useEffect(() => {
    const dropdownTriggerList = document.querySelectorAll("[data-bs-toggle='dropdown']");
    dropdownTriggerList.forEach((el) => new bootstrap.Dropdown(el));
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark px-3 py-2 sticky-top">
      <NavbarIcon />
      <NavbarLinks />
      <div className="d-flex align-items-center ms-auto">
        <NavbarSearch />
        <NavbarProfile />
      </div>
    </nav>
  );
};

export default Navbar;
