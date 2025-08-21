import React from "react";
import useDaftarSayaStore from "../data/useDaftarSayaStore";
import MyListCard from "../../../component/MyListCard";
import toast from "react-hot-toast";

const MyListSection = () => {
  const daftar = useDaftarSayaStore((state) => state.daftar);
  const removeFromDaftar = useDaftarSayaStore((state) => state.removeFromDaftar);

  const handleRemove = (id) => {
    removeFromDaftar(id);
    toast.success("Series dihapus dari daftar.");
  };

  return (
    <div className="mylist-section bg-dark text-white p-4 rounded mt-4">
      <h4 className="mb-3">📺 Daftar Saya</h4>

      {daftar.length === 0 ? (
        <p className="text-muted">Belum ada series yang ditambahkan.</p>
      ) : (
        <div className="movie-grid">
          {daftar.map((movie) => (
            <MyListCard key={movie.id} movie={movie} onRemove={() => handleRemove(movie.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListSection;
