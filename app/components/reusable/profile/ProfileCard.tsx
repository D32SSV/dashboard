"use client";
import React, { useState } from "react";

interface CardProps {
  data?: string;
  title: string;
}
const ProfileCard: React.FC<CardProps> = ({ data, title }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleCopy = (dataToBeCopied: string | undefined) => {
    if (!dataToBeCopied) {
      alert("Data not available");
      return;
    }
    navigator.clipboard.writeText(dataToBeCopied);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 900);
  };
  return (
    <div className="rounded-lg shadow-md border p-4 max-w-sm w-full">
      <h3 className="text-lg font-semibold text-gray-400 mb-2">{title}</h3>
      <div className="flex flex-row items-center justify-between">
        <p className="text-gray-600 break-words truncate">{data || "Not Available"}</p>
        {data && (
          <button
            className="p-2 cursor-pointer border rounded-2xl min-w-24 hover:bg-gray-800"
            onClick={() => handleCopy(data)}
          >
            {isCopied ? `Copied !` : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
