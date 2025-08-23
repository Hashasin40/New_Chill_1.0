import React from "react";
import "../css/mylistcard.css";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const MyListCard = ({ movie, onRemove, variant = "default" }) => {
  const handleRemove = () => {
    onRemove(movie.id);
    toast.error(`"${movie.title}" dihapus dari Daftar Saya`);
  };

  return (
    <div className={`poster-wrapper ${variant}`}>
      <div className="wrapper-portrait">
        <img
          src={movie.imagePortrait || "/default-portrait.png"}
          alt={movie.title}
          className="portrait-img"
        />

        <div className="title-overlay text-white bottom-0">
          <h5 className="mb-0">{movie.title}</h5>
          <span>
            {Array.isArray(movie.genre)
              ? movie.genre.join(", ")
              : movie.genre || "Genre tidak tersedia"}
          </span>
        </div>

        <div className="hover-buttons">
          <Button variant="danger" size="sm" onClick={handleRemove}>
            − Hapus dari Daftar Saya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyListCard;
