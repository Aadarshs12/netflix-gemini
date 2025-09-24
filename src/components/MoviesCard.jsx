import React from 'react';
import { IMG_CDN_URL, IMG_CDN_URL2 } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay, FaHeart } from "react-icons/fa";
import { BsInfoLg } from "react-icons/bs";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { IoIosCloseCircle } from "react-icons/io";
import useMovieTrailor from "../hooks/useMovieTrailor";
import { clearTrailerVideo } from "../utils/moviesSlice";
import { toast } from "react-toastify";
import { addWatchList, removeWatchList } from "../utils/watchlistSlice";
import poster from "../utils/notfoundposter.WEBP";
import posterbackdrop from "../utils/notfoundposterbackdrop.WEBP";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import useCreditsData from "../hooks/useMoviesCredits";
import useReviewsData from "../hooks/useReviewsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import YouTube from "react-youtube";

const MoviesCard = ({ movie, index }) => {
  const dispatch = useDispatch();
  const genreList = useSelector((store) => store.genre?.genreList || []);
  const trailorVideo = useSelector(
    (store) => store.movies?.trailers[movie?.id]
  );
  const credits = useSelector((store) => store.movies?.credits[movie?.id]);
  const reviews = useSelector(
    (store) => store.movies?.reviews?.[movie?.id] || []
  );
  const reviewsLoading = useSelector(
    (store) => store.movies?.reviewsLoading?.[movie?.id] || false
  );
  const reviewsError = useSelector(
    (store) => store.movies?.reviewsError?.[movie?.id] || null
  );

  const watchList = useSelector(
    (store) => store.watchlist?.watchListItems || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPlay, setIsOpenPlay] = useState(false);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);
  const { fetchTrailer, error, isFetching } = useMovieTrailor(movie?.id);

  useCreditsData(movie?.id);
  useReviewsData(movie?.id);

  useEffect(() => {
    if (reviewsError) {
      toast.error(`Error loading reviews: ${reviewsError}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  }, [reviews, reviewsError, movie?.id]);

  useEffect(() => {
  }, [credits, movie?.id]);

  const categories = [
    {
      name: "Cast",
      posts:
        credits?.cast?.slice(0, 5)?.map((member) => ({
          id: member.id,
          title: member.name,
          character: member.character,
          profile_path: member.profile_path,
        })) || [],
    },
    {
      name: "Crew",
      posts:
        credits?.crew?.slice(0, 5)?.map((member) => ({
          id: member.id,
          title: member.name,
          job: member.job,
          profile_path: member.profile_path,
        })) || [],
    },
  ];

  const isInWatchList =
    movie?.id && Array.isArray(watchList)
      ? watchList.some((item) => item?.id === movie.id)
      : false;

  useEffect(() => {
    if (error) {
      console.error(
        "[MoviesCard] Trailer fetch error for movie",
        movie?.id,
        ":",
        error
      );
      toast.error(`Failed to fetch trailer for movie ${movie?.id}: ${error}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
      setIsLoadingTrailer(false);
    }
    if (trailorVideo?.key && isLoadingTrailer) {
      setIsOpenPlay(true);
      setIsLoadingTrailer(false);
      toast.dismiss();
    }
  }, [trailorVideo, error, movie?.id, isLoadingTrailer]);

  const handlePlayInsideInfo = () => {
    if (!movie?.id) {
      console.error("[MoviesCard] No movie ID provided");
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    if (trailorVideo?.key) {
      setIsOpen(false);
      setIsOpenPlay(true);
    } else {
      setIsLoadingTrailer(true);
      toast.warn("Fetching trailer...", {
        position: "bottom-right",
        autoClose: false,
      });
      dispatch(clearTrailerVideo(movie.id));
      fetchTrailer(movie.id);
    }
  };

  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    return genre_ids
      .map((id) => {
        const genre = genreList.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  const handleAddWatchList = () => {
    if (!movie?.id) {
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    dispatch(addWatchList(movie));
    toast.success("Added to Watch List!", { position: "bottom-right" });
  };

  const handleRemoveWatchList = () => {
    if (!movie?.id) {
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    dispatch(removeWatchList(movie.id));
    toast.error("Removed from Watch List!", { position: "bottom-right" });
  };

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return poster;
    if (avatarPath.startsWith("/http")) {
      return avatarPath.substring(1);
    }
    return IMG_CDN_URL + avatarPath;
  };

  const youtubeOpts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 0,
      fs: 1, 
    },
  };

  if (!movie) {
    console.error("[MoviesCard] No movie data provided");
    return null;
  }

  return (
    <div className="forMovieCard relative overflow-visible">
      <img
        className="rounded-lg md:h-60 h-48 object-cover w-full"
        src={movie.poster_path ? IMG_CDN_URL + movie.poster_path : poster}
        alt={movie.title || "Movie"}
      />
      <span className="forCounting font-bold" data-content={index}>
        {index}
      </span>
      <div className="hoverOnMovieCard p-3 flex flex-col gap-1">
        <div className="flex flex-col-reverse gap-3 items-start">
          <button
            className="bg-[#d9232e] hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100 text-white hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center"
            onClick={handlePlayInsideInfo}
            disabled={isFetching || isLoadingTrailer}
          >
            <FaPlay />
          </button>
          <Dialog
            open={isOpenPlay}
            onClose={() => {
              setIsOpenPlay(false);
              setIsLoadingTrailer(false);
              toast.dismiss();
              dispatch(clearTrailerVideo(movie.id));
            }}
            className="fixed inset-0 z-[1000]"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-0">
              <DialogPanel className="relative w-screen h-screen bg-black overflow-hidden">
                <div className="absolute flex flex-col-reverse items-center gap-2 top-4 right-4 z-[1001]">
                  {isInWatchList ? (
                    <button
                      onClick={handleRemoveWatchList}
                      className="bg-[#2b3d5ad3] text-[#d9232e] hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
                    >
                      <FaHeart />
                    </button>
                  ) : (
                    <button
                      onClick={handleAddWatchList}
                      className="bg-[#2b3d5ad3] hover:text-[#d9232e] text-slate-300 hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
                    >
                      <FaHeart />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsOpenPlay(false);
                      setIsLoadingTrailer(false);
                      toast.dismiss();
                      dispatch(clearTrailerVideo(movie.id));
                    }}
                    className="bg-[#302e2e9d] text-4xl rounded-full text-slate-300 hover:text-[#d9232e] focus:outline-none z-[1001]"
                    aria-label="Close"
                  >
                    <IoIosCloseCircle />
                  </button>
                </div>
                <div className="w-full h-full">
                  {trailorVideo?.key ? (
                    <YouTube
                      videoId={trailorVideo.key}
                      opts={youtubeOpts}
                      className="w-full h-full"
                      iframeClassName="w-full h-full"
                      title={`Trailer for ${movie.title || "Movie"}`}
                      onReady={(event) => {
                        toast.dismiss();
                      }}
                      onError={(error) => {
                        console.error(
                          "[MoviesCard] YouTube player error:",
                          error
                        );
                        toast.error("Error loading trailer", {
                          position: "bottom-right",
                        });
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
                      <div className="text-center">
                        <p>No trailer available</p>
                        <button
                          onClick={() => {
                            setIsLoadingTrailer(true);
                            toast.warn("Fetching trailer...", {
                              position: "bottom-right",
                              autoClose: false,
                            });
                            fetchTrailer(movie.id);
                          }}
                          className="mt-2 bg-red-600 px-4 py-2 rounded"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </Dialog>
          <button
            type="button"
            className="bg-[#2b3d5ad3] text-slate-300 hover:text-[#d9232e] hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <BsInfoLg />
          </button>
          {isInWatchList ? (
            <button
              onClick={handleRemoveWatchList}
              className="bg-[#2b3d5ad3] text-[#d9232e] hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
            >
              <FaHeart />
            </button>
          ) : (
            <button
              onClick={handleAddWatchList}
              className="bg-[#2b3d5ad3] hover:text-[#d9232e] text-slate-300 hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
            >
              <FaHeart />
            </button>
          )}
        </div>
        <h4 className="text-white m-0 text-lg font-bold leading-5 line-clamp-2">
          {movie.title || "Not Available"}
        </h4>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-[1000]"
      >
        <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
        <div className="fixed inset-0 w-full h-full flex items-center justify-center">
          <DialogPanel className="w-full max-w-full flex flex-col gap-2 max-h-[100vh] bg-[#000000da] shadow-lg rounded-lg p-4 overflow-y-auto">
            <DialogTitle className="text-lg mb-2 flex justify-between items-center font-bold text-white">
              <span>Movie Details</span>
              <button
                className="text-2xl text-[#fff] hover:text-[#d9232e]"
                onClick={() => setIsOpen(false)}
              >
                <IoIosCloseCircle />
              </button>
            </DialogTitle>
            <div className="text-sm flex items-center lg:flex-row flex-col gap-3 text-[#fff]">
              <div className="relative lg:w-1/3 w-full">
                <img
                  className="w-full rounded-md object-cover"
                  src={
                    movie.backdrop_path
                      ? IMG_CDN_URL2 + movie.backdrop_path
                      : posterbackdrop
                  }
                  alt={movie.title || "Movie"}
                />
                <div className="absolute z-10 items-center right-2 bottom-2">
                  <button
                    className="bg-[#d9232e] hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100 text-white hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center"
                    onClick={handlePlayInsideInfo}
                    disabled={isFetching || isLoadingTrailer}
                  >
                    <FaPlay />
                  </button>
                </div>
              </div>
              <div className="lg:w-2/3 w-full flex text-base flex-col gap-3">
                <h2 className="text-2xl font-bold text-[#d9232e]">
                  🎥 {movie.title || "Not Available"}
                </h2>
                <span className="line-clamp-5">
                  ℹ️ {movie.overview || "Not Available"}
                </span>
                <span>
                  ⭐{" "}
                  {movie.vote_average
                    ? movie.vote_average.toFixed(1) + "/10"
                    : "N/A"}
                </span>
                <span>
                  🎬{" "}
                  {getGenres(movie.genre_ids, genreList).join(", ") ||
                    "Not Available"}
                </span>
                <span>
                  📅{" "}
                  {movie.release_date
                    ? dayjs(movie.release_date).format("MMMM D, YYYY")
                    : "Not Available"}
                </span>
              </div>
            </div>
            <TabGroup>
              <TabList className="flex gap-4">
                {categories.map(({ name }) => (
                  <Tab key={name} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`rounded-full px-3 py-1 mt-3 text-lg font-semibold transition
                        ${
                          selected
                            ? "bg-[#d9232e] text-white"
                            : "text-white hover:bg-white/5"
                        }`}
                      >
                        {name}
                      </button>
                    )}
                  </Tab>
                ))}
              </TabList>
              <TabPanels className="mt-3">
                {categories.map(({ name, posts }) => (
                  <TabPanel key={name} className="rounded-xl text-white p-3">
                    {posts.length > 0 ? (
                      <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={posts.length >= 2}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: true,
                          pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                          640: { slidesPerView: 2 },
                          768: { slidesPerView: 3 },
                          1024: { slidesPerView: 4 },
                        }}
                        className="mySwiper"
                      >
                        {posts.map((post) => (
                          <SwiperSlide key={post.id}>
                            <div className="flex gap-3 items-center rounded-lg bg-slate-300/15 p-3">
                              <div>
                                <img
                                  sizes="100px"
                                  className="w-12 h-12 object-cover rounded-full"
                                  src={
                                    post.profile_path
                                      ? IMG_CDN_URL + post.profile_path
                                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                          post.title.charAt(0) || "R"
                                        )}&background=000000&color=ffffff&rounded=true`
                                  }
                                  alt={post.title}
                                />
                              </div>
                              <div>
                                <h4 className="font-bold m-0 text-lg line-clamp-1">
                                  {post.title}
                                </h4>
                                <span className="text-sm line-clamp-1">
                                  <strong>
                                    {name === "Cast" ? "As" : "Job"}:{" "}
                                  </strong>
                                  {name === "Cast" ? post.character : post.job}
                                </span>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <p>No {name.toLowerCase()} data available.</p>
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
            <div className="text-white flex flex-col gap-3 mt-3 w-full">
              <h3 className="text-xl font-bold text-[#d9232e]">Reviews</h3>
              {reviewsLoading ? (
                <p className="p-3">Loading reviews...</p>
              ) : reviewsError ? (
                <p className="p-3 text-red-500">Error: {reviewsError}</p>
              ) : reviews?.length > 0 ? (
                reviews.length === 1 ? (
                  <div className="flex flex-col text-white rounded-lg p-3 bg-slate-300/15 max-w-full box-border">
                    <div className="flex items-center gap-3 w-full">
                      <div>
                        <img
                          sizes="100px"
                          className="w-12 h-12 object-cover rounded-full"
                          src={
                            reviews[0].author_details?.avatar_path
                              ? reviews[0].author_details.avatar_path.startsWith(
                                  "/https"
                                )
                                ? reviews[0].author_details.avatar_path.slice(1) 
                                : IMG_CDN_URL +
                                  reviews[0].author_details.avatar_path
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  reviews[0].author?.charAt(0).toUpperCase() ||
                                    "R"
                                )}&background=000000&color=ffffff&rounded=true`
                          }
                          alt={reviews[0].author || "Reviewer"}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold m-0 text-lg line-clamp-1">
                          {reviews[0].author || "Unknown"}
                        </h4>
                        <span className="lowercase text-[#d9232e] text-xs">
                          @{reviews[0].author_details?.username || "Unknown"}
                        </span>
                        <span className="text-sm line-clamp-1">
                          <strong>On: </strong>
                          {reviews[0].updated_at
                            ? dayjs(reviews[0].updated_at).format(
                                "MMMM D, YYYY"
                              )
                            : "Not Available"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm w-full mt-2">{reviews[0].content}</p>
                  </div>
                ) : (
                  <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={reviews.length >= 2}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: true,
                      pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 2 },
                    }}
                    className="mySwiper w-full"
                  >
                    {reviews.map((review) => (
                      <SwiperSlide className="p-3" key={review.id}>
                        <div className="flex flex-col text-white p-3 rounded-lg bg-slate-300/15 max-w-full box-border">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-3 ">
                              <div>
                                <img
                                  sizes="100px"
                                  className="w-12 h-12 object-cover bg-black rounded-full"
                                  src={
                                    review.author_details?.avatar_path
                                      ? IMG_CDN_URL +
                                        review.author_details.avatar_path
                                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                          review.author.charAt(0) || "R"
                                        )}&background=000000&color=ffffff&rounded=true`
                                  }
                                  alt={review.author || "Reviewer"}
                                />
                              </div>
                              <div className="flex flex-col">
                                <h4 className="font-bold m-0 text-lg line-clamp-1">
                                  {review.author || "Unknown"}
                                </h4>
                                <span className="lowercase text-white/80 text-xs">
                                  @
                                  {review.author_details?.username || "Unknown"}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex flex-nowrap gap-1 items-center">
                                <span>⭐</span>
                                <span>
                                  {review.author_details?.rating
                                    ? review.author_details?.rating.toFixed(1) +
                                      "/10"
                                    : "N/A"}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm line-clamp-1">
                                  <strong>On: </strong>
                                  {review.updated_at
                                    ? dayjs(review.updated_at).format(
                                        "MMMM D, YYYY"
                                      )
                                    : "Not Available"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p
                            className="text-sm w-full h-60 pr-2 overflow-y-auto mt-2 custom-scrollbar"
                            dangerouslySetInnerHTML={{ __html: review.content }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )
              ) : (
                <p className="p-3">No reviews available.</p>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default MoviesCard;
