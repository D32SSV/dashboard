"use client";
import React, { useState } from "react";
import { txnDetailsToShow } from "../../utils/txnDetailsToShow";
import CopyJsonButton from "../reusable/Tooltip";
import Loader from "../reusable/Loader";
import { searchById } from "@/app/actions/txnData";

const SearchById = ({ token }: { token: string | null }) => {
  const [txnId, setTxnId] = useState<string>("");
  const [txnData, setTxnData] = useState(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTxnData(null);
    setError("");

    if (!txnId.trim()) {
      setError("Transaction ID is required.");
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await searchById(token, txnId);
    if (response.success) {
      setError("");
      const { txn } = response.data;
      console.log(txn);

      setTxnData(txn);
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  };

  // console.table((txnData));
  return (
    <section className="px-2 py-2">
      <h1 className="text-2xl font-semibold inverseTheme">
        Search Transaction
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-2 max-w-[75vw] md:max-w-[38vw]"
        aria-labelledby="txn-form"
      >
        <label
          htmlFor="txnId"
          className="block text-sm font-medium my-1 inverseTheme"
        >
          Transaction ID
        </label>
        <div className="flex flex-col md:flex-row items-start justify-center gap-2">
          <input
            type="text"
            id="txnId"
            name="txnId"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md  focus:outline-none focus:ring-0 focus:border-none bg-gray-800 text-gray-300 dark:border-gray-600 border-sky-950"
            required
            aria-required="true"
            aria-describedby="txnId-desc"
            placeholder="Enter a valid transaction ID to search."
          />

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 w-max inverseBtn rounded hover:bg-gray-600 active:scale-95  focus:outline-none focus:ring-0 focus:border-none disabled:opacity-50"
          >
            {isLoading ? <Loader /> : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 font-medium" role="alert">
          {error}
        </div>
      )}

      {txnData && (
        <article className="px-[5px] py-4 rounded-md shadow-sm inverseTheme max-h-max break-words">
          <div className="flex flex-col mm:flex-row gap-4 items-start justify-center w-max mb-4">
            <h2 className="text-xl font-bold align-middle">
              Transaction Details
            </h2>
            <CopyJsonButton data={txnData} />
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 max-[325px]:grid-cols-1 max-[325px]:gap-x-28 ">
            {Object.entries(txnDetailsToShow(txnData)).map(
              ([label, value]) => (
                <div key={label}>
                  <dt className="font-normal text-lg text-gray-300">
                    {label}
                  </dt>
                  <dd className="font-normal capitalize text-gray-200 text-sm">
                    {value ?? "N/A"}
                  </dd>
                </div>
              )
            )}
          </dl>
        </article>
      )}
    </section>
  );
};
export default SearchById;
