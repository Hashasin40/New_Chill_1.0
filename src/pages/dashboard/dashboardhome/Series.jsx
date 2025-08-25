import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieSlider from "../dashboardhome/MovieSlider";
import MovieCard from "../dashboardhome/MovieCard";
import posters from "../data/poster";
import useDaftarSayaStore from "../data/useDaftarSayaStore";
import "../../../css/series.css";

function Series() {
  const location = useLocation();
  const { addToDaftar, needsRefresh, setNeedsRefresh } = useDaftarSayaStore();

  // Detect navigasi balik → set flag refresh
  useEffect(() => {
    setNeedsRefresh(true);
  }, [location.key]);

  // Refresh data saat flag aktif
  useEffect(() => {
    if (needsRefresh) {
      // Bisa tambahkan logic re-fetch di sini kalau pakai API
      console.log("🔄 Refresh konten Series...");
      setNeedsRefresh(false);
    }
  }, [needsRefresh]);

  const mapFilm = (items, extra = () => ({})) =>
    items.map((item, index) => ({
      id: item.id,
      title: item.title,
      genre: item.genre.join(", "),
      imagePortrait: item.poster,
      imageLandscape: item.landscape,
      rating: item.rating,
      ...extra(index, item),
    }));

  const MelanjutkanTontonanFilm = posters.slice(0, 10);
  const TopRatingFilmdanSeriesHariIni = posters.slice(10, 20);
  const FilmTrending = posters.slice(0, 10);
  const RilisTerbaru = posters.slice(15, 25);

  return (
    <div className="bg-custom text-white">
      <MovieSlider
        title="Melanjutkan Tontonan Film"
        movies={mapFilm(MelanjutkanTontonanFilm)}
        renderItem={(movie) => (
          <MovieCard movie={movie} type="landscape" onAddToList={addToDaftar} />
        )}
        cardWidth={240}
        type="landscape"
      />

      <MovieSlider
        title="Top Rating Film dan Series Hari ini"
        movies={mapFilm(TopRatingFilmdanSeriesHariIni)}
        renderItem={(movie) => (
          <MovieCard movie={movie} type="portrait" onAddToList={addToDaftar} />
        )}
        cardWidth={150}
        type="portrait"
      />

      <MovieSlider
        title="Film Trending"
        movies={mapFilm(FilmTrending, (index) => ({
          isTop10: index < 10,
          topRank: index + 1,
        }))}
        renderItem={(movie) => (
          <MovieCard movie={movie} type="portrait" onAddToList={addToDaftar} />
        )}
        cardWidth={150}
        type="portrait"
      />

      <MovieSlider
        title="Rilis Terbaru"
        movies={mapFilm(RilisTerbaru, () => ({
          isNewRelease: true,
        }))}
        renderItem={(movie) => (
          <MovieCard movie={movie} type="portrait" onAddToList={addToDaftar} />
        )}
        cardWidth={150}
        type="portrait"
      />
    </div>
  );
}

export default Series;
