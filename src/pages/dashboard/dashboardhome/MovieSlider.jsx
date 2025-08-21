import React from "react";
import ScrollButton from "../../../component/ScrollButton";
import "../../../css/slider.css";

function MovieSlider({
  title,
  movies,
  renderItem,
  cardWidth = 150,
  spaceBetween = 12,
  loop = true,
}) {
  const scrollRef = React.useRef();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="movie-slider container-fluid pt-5">
      <h2 className="mb-0 p-0">{title}</h2>

      <div className="d-flex justify-content-between align-items-center">
        <ScrollButton direction="left" onClick={scrollLeft} />

        <div
          className="d-flex overflow-auto gap-3 py-3 flex-grow-1 scroll-container"
          ref={scrollRef}
        >
          {movies.map((movie, index) => (
            <div
              key={index}
              style={{ minWidth: `${cardWidth}px` }}
              className="rounded"
            >
              {renderItem(movie, index)}
            </div>
          ))}
        </div>

        <ScrollButton direction="right" onClick={scrollRight} />
      </div>
    </div>
  );
}

export default MovieSlider;
