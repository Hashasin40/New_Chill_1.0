import { Outlet } from "react-router-dom";
import { useState } from "react";
import GenreList from "../footer/FooterGenre";
import BantuanList from "../footer/FooterBantuan";
import Navbar from "../dashboard/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/dashboard.css";

function DashboardLayout() {
  const [showGenre, setShowGenre] = useState(false);
  const [showBantuan, setShowBantuan] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar />

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
