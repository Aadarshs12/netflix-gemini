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
    <>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={10}
        className="custom-swiper"
        slidesPerView={6}
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
            spaceBetween: 2.4,
          },
          641: {
            slidesPerView: 4.2,
            spaceBetween: 3.4,
          },
          769: {
            slidesPerView: 6.2,
            spaceBetween: 4.4,
          },
          1025: {
            slidesPerView: 8.2,
            spaceBetween: 5.4,
          },
        }}
      >
        {TrendingMovies?.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <TrendingPoster movie={movie} index={index + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TredingList;
