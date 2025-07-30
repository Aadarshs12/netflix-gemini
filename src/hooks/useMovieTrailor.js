import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { API_Options } from "../utils/constant";
import { addTrailorVideo } from "../utils/moviesSlice";

const useMovieTrailer = (id) => { // Changed to accept id directly, renamed for consistency
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const getMovieVideos = async () => { // Removed unnecessary {id} destructuring
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        API_Options
      );
      const jsonData = await response.json();
      setData(jsonData?.results || []);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMovieVideos();
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      const filterData = data.filter((video) => video.type === "Trailer") || [];
      const trailer = filterData.length ? filterData[0] : data.length ? data[0] : null;
      dispatch(addTrailorVideo(trailer));
    }
  }, [data, dispatch]);
};

export default useMovieTrailer;