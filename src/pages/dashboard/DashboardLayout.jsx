import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as bootstrap from 'bootstrap';
import useAuth from '../../store/auth';
import GenreList from '../footer/FooterGenre';
import BantuanList from '../footer/FooterBantuan';
import IconProfile from '../../assets/icon profile2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/dashboard.css';

function DashboardLayout() {
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();
    const [showGenre, setShowGenre] = useState(false);
    const [showBantuan, setShowBantuan] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        dropdownTriggerList.forEach(dropdownTriggerEl => {
            new bootstrap.Dropdown(dropdownTriggerEl);
        });
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-dark px-3 py-2">
                {/* Brand */}
                <Link className="navbar-brand d-flex align-items-center me-3" to="/dashboard">
                    <i className="fas fa-clapperboard fs-4"></i>
                    <span className="d-none d-sm-inline ms-2">CHILL</span>
                </Link>

                {/* Nav items (langsung tampil, tidak collapse) */}
                <ul className="navbar-nav flex-row flex-wrap gap-3 me-auto">
                    <li className="nav-item">
                        <Link className="nav-link p-0 text-white" to="/dashboard">Series</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link p-0 text-white" to="#">Film</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link p-0 text-white" to="#">Daftar Saya</Link>
                    </li>
                </ul>

                {/* Profile Dropdown */}
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
            </nav>

            {/* Halaman Utama */}
            <div className="p-0 m-0">
                <Outlet />
            </div>

            {/* Footer */}
            <footer className="text-white py-4 m-0 pt-5 bg-custom border-top border-secondary">
                    <div className="container">
                    <div className="row gy-4">
                        <div className="col-12 col-md-4">
                        <h5 className="mb-1">
                            <i className="fas fa-clapperboard fs-4 me-2"></i>
                            CHILL
                        </h5>
                        <small className="d-block mb-3 form-small">
                            &copy; 2023 Chill All Rights Reserved.
                        </small>
                        </div>

                        {/* Versi Desktop */}
                        <div className="col-12 col-md-8 d-none d-md-flex">
                        <div className="row w-auto">
                            <GenreList />
                            <BantuanList />
                        </div>
                        </div>

                        {/* Versi Mobile */}
                        <div className="col-12 d-flex d-md-none flex-column gap-2">
                        {/* Toggle Genre */}
                        <button
                            className="footer-mobile-item d-flex justify-content-between w-100 text-start"
                            onClick={() => setShowGenre(!showGenre)}
                        >
                            Genre <span>{showGenre ? "⌄" : "›"}</span>
                        </button>
                        {showGenre && <GenreList />}

                        {/* Toggle Bantuan */}
                        <button
                            className="footer-mobile-item d-flex justify-content-between w-100 text-start"
                            onClick={() => setShowBantuan(!showBantuan)}
                        >
                            Bantuan <span>{showBantuan ? "⌄" : "›"}</span>
                        </button>
                        {showBantuan && <BantuanList />}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default DashboardLayout;
