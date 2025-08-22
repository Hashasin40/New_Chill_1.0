import React from "react";
import "../../../css/moviecard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useDaftarSayaStore from "../data/useDaftarSayaStore";
import toast from "react-hot-toast";

function MovieCard({ movie, type = "portrait" }) {
  const imageSrc =
    type === "landscape"
      ? movie.imageLandscape || "/default-landscape.png"
      : movie.imagePortrait || "/default-portrait.png";

  const daftar = useDaftarSayaStore((state) => state.daftar);
  const addToDaftar = useDaftarSayaStore((state) => state.addToDaftar);
  const removeFromDaftar = useDaftarSayaStore((state) => state.removeFromDaftar);

  const isInDaftar = daftar.some((m) => m.id === movie.id);

  if (!movie?.id) return null;

  return (
    <div
      className={`poster-wrapper position-relative ${
        type === "landscape" ? "wrapper-landscape" : "wrapper-portrait"
      }`}
    >
      {/* Badge Top 10 */}
      {movie.isTop10 && <div className="top10-badge">#{movie.topRank}</div>}

      {/* Badge Rilis Terbaru */}
      {movie.isNewRelease && (
        <div className="new-release-badge">
          <small>Rilis Terbaru</small>
        </div>
      )}

      {/* Poster */}
      <img
        src={imageSrc}
        alt={movie.title}
        className={`poster-img ${type === "landscape" ? "landscape-img" : "portrait-img"}`}
      />

      {/* Overlay Judul & Rating (landscape) */}
      {type === "landscape" && (
        <div className="title-overlay position-absolute bottom-0 start-0 w-100 px-2 py-1 d-flex justify-content-between align-items-center fs">
          <p className="text-white m-0">{movie.title || "Untitled"}</p>
          {movie.rating ? (
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faStar} className="text-white me-1" />
              <span className="text-white small">{movie.rating}</span>
            </div>
          ) : (
            <span className="text-muted small">No rating</span>
          )}
        </div>
      )}

      {/* Overlay Judul & Genre (portrait) */}
      {type === "portrait" && (
        <div className="title-overlay position-absolute bottom-0 w-100 text-white">
          <h5 className="mb-0">{movie.title}</h5>
          <span className="fs">
            {Array.isArray(movie.genre)
              ? movie.genre.join(", ")
              : movie.genre || "Genre tidak tersedia"}
          </span>
        </div>
      )}

      {/* Tombol Hover: Toggle Tambah/Hapus */}
      <div className="hover-buttons">
        {isInDaftar ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              removeFromDaftar(movie.id);
              toast.error(`"${movie.title}" dihapus dari Daftar Saya`);
            }}
          >
            − Hapus dari Daftar Saya
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              addToDaftar(movie);
              toast.success(`"${movie.title}" ditambahkan ke Daftar Saya`);
            }}
          >
            + Tambah ke Daftar Saya
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
