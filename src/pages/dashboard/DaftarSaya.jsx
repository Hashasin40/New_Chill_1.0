import React from "react";
import MovieSlider from "../dashboard/dashboardhome/MovieSlider";
import MovieCard from "../dashboard/dashboardhome/MovieCard";
import useDaftarSayaStore from "./data/useDaftarSayaStore";

function DaftarSaya() {
  const { daftar } = useDaftarSayaStore();

  return (
    <div className="bg-custom text-white">
      <MovieSlider
        title="Daftar Saya"
        movies={daftar}
        renderItem={(movie) => <MovieCard movie={movie} type="portrait" />}
        cardWidth={150}
      />
    </div>
  );
}

export default DaftarSaya;
