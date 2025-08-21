import { Link } from "react-router-dom";

const NavbarLinks = () => (
  <ul className="navbar-nav flex-row flex-wrap gap-3 me-auto">
    <li className="nav-item">
      <Link className="nav-link p-0 text-white" to="/dashboard">Series</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link p-0 text-white" to="/dashboard/film">Film</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link p-0 text-white" to="/dashboard/daftarsaya">Daftar Saya</Link>
    </li>
  </ul>
);

export default NavbarLinks;
