import { Link } from "react-router-dom";

const NavbarIcon = () => (
  <Link className="navbar-brand d-flex align-items-center me-3" to="/dashboard">
    <i className="fas fa-clapperboard fs-4"></i>
    <span className="d-none d-sm-inline ms-2">CHILL</span>
  </Link>
);

export default NavbarIcon;
