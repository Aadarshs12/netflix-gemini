import { useForm } from "react-hook-form";
import lang from "../utils/lang";
import { useSelector } from "react-redux";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const selectedLanguage = useSelector((store) => store.lang?.lang);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const gptResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: data }
      ],
    });

    console.log(gptResults.choices);
    
    reset();
  };

  return (
    <div className="p-12 lg:w-5/12 md:w-6/12 w-full rounded-lg bg-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-semibold text-white mb-4">
          GPT {lang[selectedLanguage].search}
        </h1>
        <input
          className="w-full my-3 text-white p-3 bg-gray-700 rounded-lg"
          placeholder={lang[selectedLanguage].gptSearchPlaceholder}
          {...register("promt", { required: true })}
        />
        {errors.promt && (
          <span className="text-red-600">This field is required</span>
        )}
        <button
          className="w-full bg-red-700 text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100"
          type="submit"
        >
          {lang[selectedLanguage].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
