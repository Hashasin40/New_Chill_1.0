import React from 'react';
import { Button } from 'react-bootstrap';

const MyListCard = ({ movie, onRemove }) => {
  return (
    <div className="poster-wrapper wrapper-portrait">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="poster-img portrait-img"
      />

      <div className="title-overlay position-absolute bottom-0 w-100 text-white p-2">
        <h5 className="mb-0">{movie.title}</h5>
        <span className="fs">{movie.genre}</span>
      </div>

      <div className="hover-buttons">
        <Button variant="danger" size="sm" onClick={() => onRemove(movie.id)}>
          Hapus
        </Button>
      </div>
    </div>
  );
};

export default MyListCard;
