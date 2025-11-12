import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import lang from "../utils/lang";
import { useDispatch, useSelector } from "react-redux";
import { model } from "../utils/geminiai";
import { API_Options, Login_Banner2 } from "../utils/constant";
import { addtmdbSearchData } from "../utils/tmdbSearchSlice";

const GeminiSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store) => store.lang?.lang);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "/.netlify/functions/tmdbProxy?path="
      : "https://api.themoviedb.org/3/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const searchTMDBMovie = async (movie) => {
    try {
      const data = await fetch(
        `${BASE_URL}search/movie?query=${encodeURIComponent(movie.trim())}&language=en-US&page=1`,
        API_Options
      );
      const json = await data.json();
      return json.results || [];
    } catch (err) {
      console.error("TMDB fetch error for:", movie, err);
      return [];
    }
  };

  const onSubmit = async (data) => {
    if (isLoading) return;

    setIsLoading(true);
    setResponse(""); // Clear previous response

    try {
      const result = await model.generateContent(
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
          data.prompt +
          ". Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Koi Mil Gaya, Bahubali, RRR."
      );

      const responseText = result.response.text();
      setResponse(responseText);

      const movieArray = responseText
        .split(",")
        .map((movie) => movie.trim())
        .filter((movie) => movie.length > 0);

      if (movieArray.length === 0) {
        setResponse("No movies found in response. Try again!");
        return;
      }

      const promiseArray = movieArray.map((movie) => searchTMDBMovie(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // Flatten and filter valid results
      const validMovies = tmdbResults.flat().filter((movie) => movie && movie.poster_path);

      dispatch(addtmdbSearchData(validMovies));

      // Smooth scroll to results
      setTimeout(() => {
        const element = document.getElementById("searchResult");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 600);
    } catch (error) {
      console.error("Gemini/Search Error:", error);
      setResponse("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <section
      className="forGeminiBottomGradient relative"
      style={{
        background: `url(${Login_Banner2}) no-repeat center center / cover`,
        minHeight: "100vh",
      }}
    >
      <div className="p-12 lg:w-2/5 2xl:w-1/3 md:w-6/12 w-full rounded-lg bg-black bg-opacity-80 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h1
            className="text-3xl font-bold mb-6 text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(to right, #4992e8 0%, #4e89ee 30%, #7e7dd3 60%, #ca6676 90%)",
            }}
          >
            Gemini {lang[selectedLanguage]?.search || "Search"}
          </h1>

          <div>
            <input
              className="w-full px-4 py-3 opacity-60 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white"
              placeholder={
                lang[selectedLanguage]?.geminiSearchPlaceholder ||
                "e.g., Sci-fi movies with AI robots"
              }
              {...register("prompt", { required: "This field is required" })}
              disabled={isLoading}
            />
            {errors.prompt && (
              <p className="mt-1 text-sm text-pink-400">{errors.prompt.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 transform
              ${isLoading
                ? "bg-purple-900 cursor-not-allowed opacity-70"
                : "bg-purple-700 hover:bg-purple-800 hover:scale-105 active:scale-100 shadow-lg"
              } text-white`}
          >
            {isLoading ? "Searching Movies..." : lang[selectedLanguage]?.search || "Search"}
          </button>
        </form>

        {response && (
          <div className="mt-8 p-5 bg-gray-800 bg-opacity-90 rounded-lg text-white border border-purple-500/30">
            <h2 className="text-xl font-semibold mb-3 text-purple-300">
              Recommended Movies:
            </h2>
            <p className="text-sm leading-relaxed font-medium">{response}</p>
            {isLoading && (
              <p className="mt-3 text-yellow-400 animate-pulse">
                Fetching movie details from TMDB...
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GeminiSearchBar;