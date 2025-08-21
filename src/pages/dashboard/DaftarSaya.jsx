import React from 'react';
import MyListCard from '../../component/MyListCard';
import '../../css/moviecard.css';
import useDaftarSayaStore from './data/useDaftarSayaStore';

const DaftarSaya = () => {
  const { daftar, removeFromDaftar } = useDaftarSayaStore();

  return (
    <div className="row g-3">
      {daftar.length === 0 ? (
        <p className="text-muted">Belum ada film di daftar kamu.</p>
      ) : (
        daftar.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
            <MyListCard movie={movie} onRemove={() => removeFromDaftar(movie.id)} />
          </div>
        ))
      )}
    </div>
  );
};

export default DaftarSaya;
