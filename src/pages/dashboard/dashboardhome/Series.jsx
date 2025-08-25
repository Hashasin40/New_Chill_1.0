import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieSlider from "../dashboardhome/MovieSlider";
import MovieCard from "../dashboardhome/MovieCard";
import useDaftarSayaStore from "../data/useDaftarSayaStore";
import axiosInstance from "../../../api/axiosInstance";
import "../../../css/series.css";

function Series() {
  const location = useLocation();
  const { addToDaftar, needsRefresh, setNeedsRefresh } = useDaftarSayaStore();

  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Navigasi balik → refresh konten
  useEffect(() => {
    setNeedsRefresh(true);
  }, [location.key]);

  useEffect(() => {
    if (needsRefresh) {
      fetchPosters();
      setNeedsRefresh(false);
    }
  }, [needsRefresh]);

  const fetchPosters = async () => {
    try {
      const res = await axiosInstance.get("/posters");
      const cleanData = res.data.filter(
        (item) => item.id && item.title && item.poster && item.landscape
      );
      setPosters(cleanData);
    } catch (err) {
      console.error("❌ Gagal fetch posters:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const mapFilm = (items, extra = () => ({})) =>
    items.map((item, index) => ({
      id: item.id,
      title: item.title,
      genre: Array.isArray(item.genre) ? item.genre.join(", ") : item.genre || "Unknown",
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
      {isLoading ? (
        <div className="text-center py-5">Loading film...</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Series;
