"use client";
import React, { useState } from "react";
// import { getTxnById } from "../../../api/txnApi";
import { txnDetailsToShow } from "../../utils/txnDetailsToShow";
import CopyJsonButton from "../reusable/Tooltip";
import Loader from "../reusable/Loader";

const SearchById = () => {
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

    try {
      return
      const response = await getTxnById(id, txnId, token);
      if (!response.success) throw new Error("Transaction not found");
      else {
        setError("");
        let data = response.data.txn;
        if (response.data?.extraDetails) {
          data = { data, extraDetails: response.data?.extraDetails };
        }
        setTxnData(data);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
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
            className="w-full px-4 py-2 border rounded-md  focus:outline-none focus:ring-0 focus:border-none bg-pink-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 border-pink-600 placeholder:text-pink-500"
            required
            aria-required="true"
            aria-describedby="txnId-desc"
            placeholder="Enter a valid transaction ID to search."
          />

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 w-max inverseBtn rounded hover:bg-pink-300 dark:hover:bg-violet-400  focus:outline-none focus:ring-0 focus:border-none disabled:opacity-50"
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
        <article className="border px-[5px] py-4 rounded-md shadow-sm inverseTheme max-h-max break-words">
          <div className="flex flex-col mm:flex-row gap-4 items-start justify-center w-max mb-4">
            <h2 className="text-lg font-bold align-middle">
              Transaction Details
            </h2>
            <CopyJsonButton data={txnData} />
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 max-[325px]:grid-cols-1 max-[325px]:gap-x-28 ">
            {Object.entries(txnDetailsToShow(txnData?.data)).map(
              ([label, value]) => (
                <div key={label}>
                  <dt className="font-normal text-xl text-gray-700 dark:text-gray-200">
                    {label}
                  </dt>
                  <dd className="text-gray-900 font-normal capitalize dark:text-white text-sm">
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
