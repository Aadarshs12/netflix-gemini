"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useMovieTrailor from "../hooks/useMovieTrailor";
import { clearTrailerVideo } from "../utils/moviesSlice";
import { toast } from "react-toastify";

const VideoBackground = ({ id }) => {
  const dispatch = useDispatch();
  const trailorVideo = useSelector((store) => store.movies?.trailers[id]);
  const { fetchTrailer, error, isFetching } = useMovieTrailor(id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== 'number') {
      console.error("[VideoBackground] Invalid or missing movie ID:", id);
      toast.error("Invalid movie ID", { position: "bottom-right" });
      return;
    }
    console.log("[VideoBackground] Initiating trailer fetch for movie", id);
    setIsLoading(true);
    dispatch(clearTrailerVideo(id)); // Clear previous trailer
    fetchTrailer(id);
  }, [id, dispatch, fetchTrailer]);

  useEffect(() => {
    console.log("[VideoBackground] Movie ID:", id, "Trailer:", trailorVideo, "Error:", error);
    if (error) {
      console.error("[VideoBackground] Trailer fetch error:", error);
      toast.error(`Failed to fetch trailer: ${error}`, { position: "bottom-right" });
      setIsLoading(false);
    }
    if (trailorVideo?.key) {
      console.log("[VideoBackground] Trailer loaded for key:", trailorVideo.key);
      setIsLoading(false);
      toast.dismiss();
    }
  }, [trailorVideo, error, id]);

  if (!id || typeof id !== 'number') {
    return null; // Prevent rendering if no ID
  }

  return (
    <div className="w-full aspect-video overflow-hidden forBackgroundGradient">
      {isFetching || isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
          <p>Loading trailer...</p>
        </div>
      ) : trailorVideo?.key ? (
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailorVideo.key}?autoplay=1&mute=1&loop=1&playlist=${trailorVideo.key}&controls=0&modestbranding=1&rel=0&playsinline=1`}
          title={`Trailer for Movie ID ${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => console.log("[VideoBackground] Iframe loaded for", trailorVideo.key)}
          onError={(err) => console.error("[VideoBackground] Iframe error:", err)}
        ></iframe>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
          <p>No trailer available</p>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;