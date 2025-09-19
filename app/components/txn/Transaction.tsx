"use client";
import React, { useState } from "react";
import SearchById from "./SearchById";
import SearchByFilter from "./SearchByFilter";
import { useAuth } from "@/app/context/AuthContext";

const TxnTracking = () => {
  const { token } = useAuth();
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
    <div className="outer overflow-hidden">
      <div className="flex items-start justify-center w-full mm:absolute gap-4 md:gap-20 mt-0 mm:z-[1] rounded px-4 py-3 bg-background">
        <label className="cursor-pointer space-x-1 border-2 border-blue-950 p-2 rounded-lg">
          <input
            type="checkbox"
            checked={isSearchByIdOpen}
            onChange={toggleSearchById}
            className=""
          />

          <span className="text-md font-normal text-gray-400 whitespace-nowrap">
            Search By Id
          </span>
        </label>
        <label className="cursor-pointer space-x-1 border-2 border-blue-950 p-2 rounded-lg">
          <input
            type="checkbox"
            checked={isSearchByFilterOpen}
            onChange={toggleSearchByFilter}
            className=""
          />
          <span className="text-md font-normal text-gray-400 whitespace-nowrap">
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
    } 
   rounded relative top-11`}
      >
        <SearchByFilter token={token} />
      </div>
      <div
        className={`my-8 mx-1 transition-all duration-300 ease-in-out transform 
    ${
      isSearchByIdOpen
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-95 pointer-events-none hidden"
    } 
   rounded relative top-11`}
      >
        <SearchById token={token} />
      </div>
    </div>
  );
};

export default TxnTracking;
