import React from 'react';
import GeminiMovieSuggetions from "./GeminiMovieSuggetions";
import GeminiSearchBar from "./GeminiSearchBar";

const GeminiSearch = () => {
  return (
    <>
      <GeminiSearchBar />
      <GeminiMovieSuggetions />
    </>
  );
};

export default GeminiSearch;
