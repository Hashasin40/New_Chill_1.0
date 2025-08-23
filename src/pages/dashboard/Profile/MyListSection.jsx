import React from "react";
import useDaftarSayaStore from "../data/useDaftarSayaStore";
import MyListCard from "../../../component/MyListCard";
import ScrollButton from "../../../component/ScrollButton";
import toast from "react-hot-toast";
import useBreakpoint from "../../hooks/useBreakpoint";
import "../../../css/mylistsection.css";

const MyListSection = () => {
  const daftar = useDaftarSayaStore((state) => state.daftar);
  const removeFromDaftar = useDaftarSayaStore((state) => state.removeFromDaftar);
  const scrollRef = React.useRef();
  const { isMobile, isSmallMobile, isTinyMobile } = useBreakpoint();

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

  const hideScrollButtons = isMobile || isSmallMobile || isTinyMobile;

  return (
    <div className="mylist-section container-fluid px-4 pb-4">
      <h4 className="mb-3 text-white">Daftar Saya</h4>

      {daftar.length === 0 ? (
        <p className="text-muted m-0">Belum ada series yang ditambahkan.</p>
      ) : (
        <div className="scroll-wrapper d-flex align-items-center">
          {!hideScrollButtons && <ScrollButton direction="left" onClick={scrollLeft} />}

          <div
            className="scroll-container d-flex overflow-auto gap-3 py-2 flex-grow-1 scroll-bar"
            ref={scrollRef}
          >
            {daftar.map((movie) => (
              <MyListCard
                key={movie.id}
                movie={movie}
                onRemove={() => handleRemove(movie.id)}
                variant="compact"
              />
            ))}
          </div>

          {!hideScrollButtons && <ScrollButton direction="right" onClick={scrollRight} />}
        </div>
      )}
    </div>
  );
};

export default MyListSection;
