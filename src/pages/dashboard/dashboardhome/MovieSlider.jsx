import React from "react";
import ScrollButton from "../../../component/ScrollButton";
import useBreakpoint from "../../hooks/useBreakpoint";
import "../../../css/slider.css";

function MovieSlider({
  title,
  movies,
  renderItem,
  cardWidth = 150,
  spaceBetween = 12,
  type = "portrait", // ⬅️ Tambahkan ini
}) {
  const scrollRef = React.useRef();
  const { isMobile, isSmallMobile, isTinyMobile } = useBreakpoint();

  const viewportWidth = window.innerWidth;
  const horizontalPadding = 32;
  const gap = isTinyMobile ? 8 : isSmallMobile ? 10 : spaceBetween;

  // 💡 Hitung jumlah poster per slide berdasarkan type
  const posterPerSlide = isMobile
    ? type === "landscape"
      ? 2
      : 3 // bisa 3 penuh atau 4 agak rapat
    : null;

  const responsiveCardWidth = isMobile
    ? (viewportWidth - horizontalPadding - gap * (posterPerSlide - 1)) / posterPerSlide
    : cardWidth;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -viewportWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: viewportWidth, behavior: "smooth" });
  };

  return (
    <div className="movie-slider container-fluid pt-3 px-3">
      <h2 className="slider-title">{title}</h2>

      <div className="d-flex justify-content-between align-items-center">
        {!isMobile && <ScrollButton direction="left" onClick={scrollLeft} />}

        <div
          className="d-flex overflow-auto py-3 flex-grow-1 scroll-container"
          ref={scrollRef}
          style={{ gap: `${gap}px` }}
        >
          {movies.map((movie, index) => (
            <div
              key={index}
              style={{ minWidth: `${responsiveCardWidth}px` }}
              className="rounded"
            >
              {renderItem(movie, index)}
            </div>
          ))}
        </div>

        {!isMobile && <ScrollButton direction="right" onClick={scrollRight} />}
      </div>
    </div>
  );
}

export default MovieSlider;
