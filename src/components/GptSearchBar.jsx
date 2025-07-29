import { useForm } from "react-hook-form";
import lang from "../utils/lang";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const selectedLanguage = useSelector((store) => store.lang?.currentLanguage);
  const currentLang = lang[selectedLanguage] || lang["en"]; // 👈 fallback

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="p-12 lg:w-5/12 md:w-6/12 w-full rounded-lg bg-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-semibold text-white mb-4">GPT Search</h1>
        <input
          className="w-full my-3 text-white p-3 bg-gray-700 rounded-lg"
          placeholder={currentLang.gptSearchPlaceholder}
          {...register("promt", { required: true })}
        />
        {errors.promt && (
          <span className="text-red-600">This field is required</span>
        )}
        <button
          className="w-full bg-red-700 text-white p-3 rounded-lg mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100"
          type="submit"
        >
          {currentLang.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
