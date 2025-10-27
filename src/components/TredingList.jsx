import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import TrendingPoster from "./TrendingPoster";

const TredingList = () => {
  const TrendingMovies = useSelector((state) => state.movies?.trendingMovies);
  console.log("TrendingMovies", TrendingMovies);

  return (
    <div className="mx-8 counting -mt-16">
      <h2 className="text-slate-300 text-3xl mb-3">TrendFlix India</h2>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={10}
        className="custom-swiper"
        slidesPerView={8}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
         breakpoints={{
          320: {
            slidesPerView: 2.2,
            spaceBetween: 5,
          },
          641: {
            slidesPerView: 4.2,
            spaceBetween: 8,
          },
          769: {
            slidesPerView: 6.2,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 8.2,
            spaceBetween: 10,
          },
        }}
      >
        {TrendingMovies?.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <TrendingPoster movie={movie} index={index + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TredingList;
