import { Link } from "react-router-dom";
import IconProfile from "../../../assets/icon profile2.png";
import useAuth from "../../../store/auth";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = () => {
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-dark dropdown-toggle d-flex align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={IconProfile}
          alt="Profile"
          className="rounded-circle"
          width="30"
          height="30"
        />
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="/dashboard/profile">Profil Saya</Link></li>
        <li><Link className="dropdown-item" to="/dashboard/settings">Ubah Password</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item text-danger" onClick={handleLogout}>Keluar</button></li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
