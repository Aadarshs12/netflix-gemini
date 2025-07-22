import GptMovieSuggetions from "./GptMovieSuggetions";
import GptSearchBar from "./GptSearchBar";
import { Login_Banner2 } from "../utils/constant";

const GptSearch = () => {
  return (
    <>
      <div className="absolute h-screen w-full inset-0 -z-10">
        <img
          className="w-full h-screen object-cover"
          src={Login_Banner2}
          alt="bg-imag"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggetions />
    </>
  );
};

export default GptSearch;
