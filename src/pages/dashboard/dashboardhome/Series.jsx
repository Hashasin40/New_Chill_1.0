import React from "react";
import MovieSlider from "../dashboardhome/MovieSlider";
import MovieCard from "../dashboardhome/MovieCard";
import posters from "../data/poster";
import "../../../css/series.css";

function Series() {
  const MelanjutkanTontonanFilm = posters.slice(0, 10);
  const TopRatingFilmdanSeriesHariIni = posters.slice(10, 20);
  const FilmTrending = posters.slice(0, 10);
  const RilisTerbaru = posters.slice(15, 25);

  return (
    <div className="bg-custom text-white">
      <MovieSlider
        title="Melanjutkan Tontonan Film"
        movies={MelanjutkanTontonanFilm.map((item) => ({
          title: item.title,
          genre: item.genre.join(", "),
          imagePortrait: item.poster,
          imageLandscape: item.landscape,
          rating: item.rating,
        }))}
        renderItem={(movie) => <MovieCard movie={movie} type="landscape" />}
        cardWidth={240}
      />
      <MovieSlider
        title="Top Rating Film dan Series Hari ini"
        movies={TopRatingFilmdanSeriesHariIni.map((item) => ({
          title: item.title,
          genre: item.genre.join(", "),
          imagePortrait: item.poster,
          imageLandscape: item.landscape,
          rating: item.rating,
        }))}
        renderItem={(movie) => <MovieCard movie={movie} type="portrait" />}
        cardWidth={150}
      />
      <MovieSlider
        title="Film Trending"
        movies={FilmTrending.map((item, index) => ({
          title: item.title,
          genre: item.genre.join(", "),
          imagePortrait: item.poster,
          imageLandscape: item.landscape,
          rating: item.rating,
          isTop10: index < 10,
          topRank: index + 1, // ✅ ini penting untuk badge
        }))}
        renderItem={(movie) => <MovieCard movie={movie} type="portrait" />}
        cardWidth={150}
      />
      <MovieSlider
        title="Rilis Terbaru"
        movies={RilisTerbaru.map((item, index) => ({
          title: item.title,
          genre: item.genre.join(", "),
          imagePortrait: item.poster,
          imageLandscape: item.landscape,
          rating: item.rating,
          isNewRelease: true,        
        }))}
        renderItem={(movie) => <MovieCard movie={movie} type="portrait" />}
        cardWidth={150}
      />

    </div>
  );
}

export default Series;


