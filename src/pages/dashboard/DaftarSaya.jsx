import React from "react";
import PageShell from "../hooks/PageShell"; // pastikan path sesuai
import MyListCard from "../../component/MyListCard";
import "../../css/moviecard.css";
import useDaftarSayaStore from "./data/useDaftarSayaStore";

const DaftarSaya = () => {
  const { daftar, removeFromDaftar } = useDaftarSayaStore();

  return (
    <PageShell>
      <div className="movie-grid">
        {daftar.length === 0 ? (
          <p className="text-muted">Belum ada film di daftar kamu.</p>
        ) : (
          daftar.map((movie) => (
            <MyListCard
              key={movie.id}
              movie={movie}
              onRemove={() => removeFromDaftar(movie.id)}
            />
          ))
        )}
      </div>
    </PageShell>
  );
};

export default DaftarSaya;
