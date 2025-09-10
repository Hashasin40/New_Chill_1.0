import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/redux/userSlice';

function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector((state) => state.user.data?.avatar);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
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
          src={avatar}
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
        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            Keluar
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
