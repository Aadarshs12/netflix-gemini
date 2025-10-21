import React from "react";
import { useForm } from "react-hook-form";
import lang from "../utils/lang";
import { useDispatch, useSelector } from "react-redux";
import { model } from "../utils/geminiai";
import { useState } from "react";
import { API_Options, Login_Banner2 } from "../utils/constant";
import { addtmdbSearchData } from "../utils/tmdbSearchSlice";

const GeminiSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store) => store.lang?.lang);
  const [response, setResponse] = useState("");

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
    const data = await fetch(
      `${BASE_URL}search/movie?query=` +
        movie.trim() +
        "&language=en-US&page=1",
      API_Options
    );
    const response = await data.json();
    return response.results;
  };

  const onSubmit = async (data) => {
    try {
      const result = await model.generateContent(
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
          data.prompt +
          ". Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Koi Mil Gya, Bahubali, RRR."
      );

      const responseText = result.response.text();
      setResponse(responseText);
      const movieArray = responseText.split(",").map((movie) => movie.trim());

      const promiseArray = movieArray.map((movie) => searchTMDBMovie(movie));
      const tmdbMovieList = await Promise.all(promiseArray);
      dispatch(addtmdbSearchData(tmdbMovieList));

      setTimeout(() => {
        const element = document.getElementById("searchResult");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 800);
    } catch (error) {
      console.error("Error:", error);
      setResponse("⚠️ Something went wrong. Please try again.");
    }

    reset();
  };

  return (
    <section
      className="forGeminiBottomGradient"
      style={{
        background: `url(${Login_Banner2}) no-repeat center center / cover`,
        minHeight: "100vh",
      }}
    >
      <div className="p-12 lg:w-5/12 md:w-6/12 w-full rounded-lg bg-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1
            className="text-3xl font-semibold mb-4"
            style={{
              background:
                "linear-gradient(to right, #4992e8 0%, #4e89ee 30%, #7e7dd3 60%, #ca6676 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Gemini {lang[selectedLanguage]?.search || "Search"}
          </h1>

          <input
            className="w-full my-3 text-white p-3 bg-gray-700 rounded-lg"
            placeholder={
              lang[selectedLanguage]?.geminiSearchPlaceholder || "Enter prompt"
            }
            {...register("prompt", { required: true })}
          />
          {errors.prompt && (
            <span className="text-purple-600">This field is required</span>
          )}
          <button
            className="w-full bg-purple-700 text-white p-3 rounded-lg mt-4 hover:bg-purple-800 hover:scale-105 active:bg-purple-900 active:scale-100"
            type="submit"
          >
            {lang[selectedLanguage]?.search || "Search"}
          </button>
        </form>
        {response && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-white whitespace-pre-wrap">
            <h2 className="text-xl font-semibold mb-2">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GeminiSearchBar;
