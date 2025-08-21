import React from "react";
import "../css/moviecard.css";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const MyListCard = ({ movie, onRemove }) => {
  const handleRemove = () => {
    onRemove(movie.id);
    toast.error(`"${movie.title}" dihapus dari Daftar Saya`);
  };

  return (
    <div className="poster-wrapper wrapper-portrait position-relative group">
      <img
        src={movie.imagePortrait || "/default-portrait.png"}
        alt={movie.title}
        className="poster-img portrait-img"
      />

      <div className="title-overlay position-absolute bottom-0 w-100 text-white p-2">
        <h5 className="mb-0">{movie.title}</h5>
        <span className="fs">
          {Array.isArray(movie.genre)
            ? movie.genre.join(", ")
            : movie.genre || "Genre tidak tersedia"}
        </span>
      </div>

      <div className="hover-buttons position-absolute bottom-0 start-0 w-100 text-center">
        <Button variant="danger" size="sm" onClick={handleRemove}>
          − Hapus dari Daftar Saya
        </Button>
      </div>
    </div>
  );
};

export default MyListCard;
