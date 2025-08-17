import GeminiMovieSuggetions from "./GeminiMovieSuggetions";
import GeminiSearchBar from "./GeminiSearchBar";
import { Login_Banner2 } from "../utils/constant";

const GeminiSearch = () => {
  return (
    <>
      <div className="absolute h-screen w-full inset-0 -z-10">
        <img
          className="w-full h-screen object-cover"
          src={Login_Banner2}
          alt="bg-imag"
        />
      </div>
      <GeminiSearchBar />
      <GeminiMovieSuggetions />
    </>
  );
};

export default GeminiSearch;
