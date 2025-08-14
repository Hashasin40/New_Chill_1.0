import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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
  scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
};

const scrollRight = () => {
  scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
};


  return (
      <div className="movie-slider container-fluid pt-5">
        <h2 className="mb-0 p-0">
          {title}
        </h2>

        <div className="d-flex justify-content-between align-items-center">
          <button onClick={scrollLeft} className="btn btn-left btn-dark me-0 rounded-circle">‹</button>

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

          <button onClick={scrollRight} className="btn btn-right btn-dark ms-0 rounded-circle">›</button>
        </div>
      </div>
  );
}

export default MovieSlider;
