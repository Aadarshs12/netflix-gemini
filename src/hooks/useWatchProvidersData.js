import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProviders, setProvidersLoading } from "../utils/moviesSlice";
import { API_Options } from "../utils/constant";

const useWatchProvidersData = (movieId) => {
  const dispatch = useDispatch();

  const id = Number(movieId);

  if (!id || isNaN(id)) {
    console.warn("[useWatchProvidersData] Invalid movieId:", movieId);
    return null;
  }

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "/.netlify/functions/tmdbProxy?path="
      : "https://api.themoviedb.org/3/";

  useEffect(() => {

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); 
    const fetchProviders = async () => {
      dispatch(setProvidersLoading({ movieId: id, loading: true }));

      try {
        const url = `${BASE_URL}movie/${id}/watch/providers`;

        const response = await fetch(url, {
          ...API_Options,
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();

        const regionData =
          json.results?.IN ||
          json.results?.US ||
          Object.values(json.results || {})[0] ||
          {};

        const flat = regionData.flatrate || [];
        const rent = regionData.rent || [];
        const buy = regionData.buy || [];

        const allProviders = [...flat, ...rent, ...buy];


        dispatch(addProviders({ movieId: id, providers: allProviders }));
      } catch (error) {
        clearTimeout(timeout);
        if (error.name === "AbortError") {
          console.warn("[useWatchProvidersData] TIMEOUT for", id);
        } else {
          console.error("[useWatchProvidersData] ERROR:", error);
        }
        dispatch(addProviders({ movieId: id, providers: [] }));
      } finally {
        console.log("[useWatchProvidersData] FINALLY → loading = false");
        dispatch(setProvidersLoading({ movieId: id, loading: false }));
      }
    };

    fetchProviders();

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [id, dispatch]);

  return null;
};

export default useWatchProvidersData;