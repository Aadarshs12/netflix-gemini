import { useForm } from "react-hook-form";
import lang from "../utils/lang";
import { useSelector } from "react-redux";
import { model } from "../utils/geminiai"; 
import { useState } from "react";

const GeminiSearchBar = () => {
  const selectedLanguage = useSelector((store) => store.lang?.lang);
  const [response, setResponse] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await model.generateContent("Act as a Movie Recommendation system and suggest some movies for the query : " + data.promt + ". only give me names of 5 movies.");

      const responseText = result.response.text();
      console.log("Gemini Response:", responseText);

      setResponse(responseText);
    } catch (error) {
      console.error("Error:", error);
      setResponse("⚠️ Something went wrong. Please try again.");
    }

    reset();
  };

  return (
    <div className="p-12 lg:w-5/12 md:w-6/12 w-full rounded-lg bg-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-semibold text-white mb-4">
          Gemini {lang[selectedLanguage]?.search || "Search"}
        </h1>
        <input
          className="w-full my-3 text-white p-3 bg-gray-700 rounded-lg"
          placeholder={
            lang[selectedLanguage]?.geminiSearchPlaceholder || "Enter prompt"
          }
          {...register("promt", { required: true })}
        />
        {errors.promt && (
          <span className="text-red-600">This field is required</span>
        )}
        <button
          className="w-full bg-red-700 text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100"
          type="submit"
        >
          {lang[selectedLanguage]?.search || "Search"}
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 max-h-40 overflow-y-scroll bg-gray-800 rounded-lg text-white whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiSearchBar;
