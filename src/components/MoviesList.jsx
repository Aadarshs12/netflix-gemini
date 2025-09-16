import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MoviesCard from "./MoviesCard";

const MoviesList = ({ title, movies, property }) => {
  if (!movies) return null;
  return (
    <div id="searchResult" className={`py-6 px-10 relative z-20 ${property}`}>
      <h2 className="text-slate-300 text-3xl mb-3">{title}</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={8}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          641: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          769: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
      >
        {movies?.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <MoviesCard movie={movie} index={index + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;