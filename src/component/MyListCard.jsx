import React from "react";
import "../css/moviecard.css"; // pastikan path sesuai
import { Button } from "react-bootstrap";
import toast from "react-hot-toast"; // ✅ Tambahkan ini

const MyListCard = ({ movie, onRemove }) => {
  const handleRemove = () => {
    onRemove(movie.id);
    toast.error(`"${movie.title}" dihapus dari Daftar Saya`);
  };

  return (
    <div className="poster-wrapper wrapper-portrait position-relative group">
      {/* Poster */}
      <img
        src={movie.imagePortrait || "/default-portrait.png"}
        alt={movie.title}
        className="poster-img portrait-img"
      />

      {/* Overlay Judul & Genre */}
      <div className="title-overlay position-absolute bottom-0 w-100 text-white p-2">
        <h5 className="mb-0">{movie.title}</h5>
        <span className="fs">
          {Array.isArray(movie.genre)
            ? movie.genre.join(", ")
            : movie.genre || "Genre tidak tersedia"}
        </span>
      </div>

      {/* Tombol Hapus saat Hover */}
      <div className="hover-buttons">
        <Button variant="danger" size="sm" onClick={handleRemove}>
          − Hapus dari Daftar Saya
        </Button>
      </div>
    </div>
  );
};

export default MyListCard;
