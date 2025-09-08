"use client";
import React, { useState } from "react";
import SearchById from "./SearchById";
import SearchByFilter from "./SearchByFilter";

const TxnTracking = () => {
  const [isSearchByIdOpen, setIsSearchByIdOpen] = useState<boolean>(false);
  const [isSearchByFilterOpen, setIsSearchByFilterOpen] =
    useState<boolean>(true);

  const toggleSearchById = () => {
    setIsSearchByIdOpen((prev) => !prev);
    setIsSearchByFilterOpen(false);
  };
  const toggleSearchByFilter = () => {
    setIsSearchByFilterOpen((prev) => !prev);
    setIsSearchByIdOpen(false);
  };

  return (
    <div className="outer">
      <div className="flex items-center justify-center mm:absolute gap-8 mt-2 mm:z-[1] bg-pink-400 dark:bg-sl_violet rounded px-4 pt-1 shadow shadow-pink-800 dark:shadow-violet-300">
        <label className="cursor-pointer space-x-1">
          <input
            type="checkbox"
            checked={isSearchByIdOpen}
            onChange={toggleSearchById}
            className=""
          />
          <span className="text-md font-normal text-text_violet">
            Search By Id
          </span>
        </label>
        <label className="cursor-pointer space-x-1">
          <input
            type="checkbox"
            checked={isSearchByFilterOpen}
            onChange={toggleSearchByFilter}
            className=""
          />
          <span className="text-md font-normal text-text_violet">
            Search By Filter
          </span>
        </label>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out transform 
    ${
      isSearchByFilterOpen
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-95 pointer-events-none hidden"
    } shadow
    shadow-pink-500 dark:shadow-crypto_violet rounded relative top-11`}
      >
        <SearchByFilter />
      </div>
      <div
        className={` mx-1 transition-all duration-300 ease-in-out transform 
    ${
      isSearchByIdOpen
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-95 pointer-events-none hidden"
    } shadow
    shadow-pink-500 dark:shadow-crypto_violet rounded relative top-11`}
      >
        <SearchById />
      </div>
    </div>
  );
};

export default TxnTracking;
