import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GeminiSearch from "./GeminiSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGeminiSearch = useSelector(
    (state) => state.gemini.showGeminiSearch
  );
  return (
    <div>
      <Header />
      {showGeminiSearch ? (
        <GeminiSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
