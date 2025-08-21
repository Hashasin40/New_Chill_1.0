import React from "react";
import useDaftarSayaStore from "../data/useDaftarSayaStore";
import MyListCard from "../../../component/MyListCard";
import ScrollButton from "../../../component/ScrollButton";
import toast from "react-hot-toast";
import "../../../css/mylistsection.css";

const MyListSection = () => {
  const daftar = useDaftarSayaStore((state) => state.daftar);
  const removeFromDaftar = useDaftarSayaStore((state) => state.removeFromDaftar);
  const scrollRef = React.useRef();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleRemove = (id) => {
    removeFromDaftar(id);
    toast.success("Series dihapus dari daftar.");
  };

  return (
    <div className="mylist-section container-fluid pt-4">
      <h4 className="mb-3 text-white">📺 Daftar Saya</h4>

      {daftar.length === 0 ? (
        <p className="text-muted">Belum ada series yang ditambahkan.</p>
      ) : (
        <div className="d-flex align-items-center">
          <ScrollButton direction="left" onClick={scrollLeft} />

          <div
            className="d-flex overflow-auto gap-3 py-2 flex-grow-1 scroll-bar"
            ref={scrollRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {daftar.map((movie) => (
              <MyListCard
                key={movie.id}
                movie={movie}
                onRemove={() => handleRemove(movie.id)}
              />
            ))}
          </div>

          <ScrollButton direction="right" onClick={scrollRight} />
        </div>
      )}
    </div>
  );
};

export default MyListSection;
