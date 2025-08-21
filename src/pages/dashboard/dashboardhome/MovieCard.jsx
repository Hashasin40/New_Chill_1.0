import React from 'react';
import '../../../css/moviecard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useDaftarSayaStore from '../data/useDaftarSayaStore';

function MovieCard({ movie, type = "portrait", isInDaftarPage = false }) {
  const imageSrc = type === "landscape" ? movie.imageLandscape : movie.imagePortrait;
  const { addToDaftar, removeFromDaftar, daftar } = useDaftarSayaStore();

  const isInDaftar = daftar.some((m) => m.title === movie.title);

  return (
    <div className={`poster-wrapper position-relative group ${type === "landscape" ? "wrapper-landscape" : "wrapper-portrait"}`}>
      
      {/* Badge Top 10 */}
      {movie.isTop10 && <div className="top10-badge">#{movie.topRank}</div>}

      {/* Badge Rilis Terbaru */}
      {movie.isNewRelease && (
        <div className="position-absolute text-white fw-bold px-2 py-1 rounded-pill small shadow new-release-badge fs">
          <small>Rilis Terbaru</small>
        </div>
      )}

      {/* Poster */}
      <img src={imageSrc} alt={movie.title} className={`poster-img ${type === "landscape" ? "landscape-img" : ""}`} />

      {/* Overlay Judul & Rating (khusus landscape) */}
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

      {/* Tombol Hover */}
      <div className="hover-buttons position-absolute bottom-0 start-0 w-100 text-center">
        {!isInDaftar && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToDaftar(movie)}
          >
            + Tambah ke Daftar Saya
          </button>
        )}

        {isInDaftar && isInDaftarPage && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeFromDaftar(movie.title)}
          >
            − Hapus dari Daftar Saya
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
