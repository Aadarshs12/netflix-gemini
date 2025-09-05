import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { API_Options } from "../utils/constant";
import { addTrailorVideo, clearTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailor = (id) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const getMovieVideos = async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        API_Options
      );
      const jsonData = await response.json();
      setData(jsonData?.results || []);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
      setData([]);
    }
  };

  useEffect(() => {
    getMovieVideos();
    return () => {
      dispatch(clearTrailerVideo(id));
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (data) {
      const filterData = data.filter((video) => video.type === 'Trailer' && video.site === 'YouTube') || [];
      const trailer = filterData.length ? filterData[0] : data.length ? data[0] : null;
      dispatch(addTrailorVideo({ movieId: id, trailer }));
    }
  }, [data, id, dispatch]);
};

export default useMovieTrailor;