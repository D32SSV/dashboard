import React, { useState } from "react";
import Loader from "../reusable/Loader";
import { filteredTxns } from "@/app/actions/txnData";

type Txn = {
  _id: string;
  orderId: string;
  fromAmount?: number;
  status?: string;
  createdAt: string;
  message: string;
};

const SearchByFilter = ({ token }: { token: string | null }) => {
  const [filters, setFilters] = useState({
    limit: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [results, setResults] = useState<Txn[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResults([]);

    try {
      const updatedData = {
        ...filters,
      };
      const response = await filteredTxns(token, updatedData);
      if (!response.success) throw new Error("No transactions found.");
      setResults(response.data);
      if (response.data.length === 0) {
        setError("No data found for above selected filters");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(">>>>", filters);

  return (
    <>
      <section className="px-3 pt-3 pb-2 mt-8 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-semibold inverseTheme">
          Search by Filter
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-wrap gap-4 my-4 max-w-full"
        >
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium inverseTheme"
            >
              Status
            </label>
            <select
              name="status"
              value={filters.status || ""}
              onChange={handleChange}
              className="capitalize w-full px-4 py-[0.6rem] rounded-md border bg-gray-800 text-gray-300 border-gray-600 placeholder:text-gray-300"
            >
              <option value="">Select status</option>
              {["init_pending", "success", "failed"].map((o, index) => {
                return (
                  <option key={index} value={o}>
                    {o}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium inverseTheme"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border bg-gray-800 text-gray-500 border-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium inverseTheme"
            >
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-gray-500"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 w-full inverseBtn rounded hover:bg-gray-900 disabled:opacity-50"
            >
              {isLoading ? <Loader /> : "Search"}
            </button>
          </div>
        </form>
        {/* <hr className="my-8 mx-2 rounded-2xl border-t-8 border-t-sky-600" /> */}

        {error && (
          <div className="text-red-600 font-medium mb-4 text-center">
            {error}
          </div>
        )}
      </section>{" "}
      {results.length > 0 && (
        <div className="w-full flex items-center justify-center">
        <div className="overflow-x-auto mt-4 rounded-md border shadow-md inverseTheme w-full lg:max-w-2/3">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-2">S.No.</th>
                <th className="px-4 py-2">CPT Txn ID</th>
                <th className="px-4 py-2">Merchant Order Id</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((txn, index) => (
                <tr
                  key={txn._id}
                  className="border-t border-gray-600 hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{txn._id}</td>
                  <td className="px-4 py-2">{txn.orderId}</td>
                  <td className="px-4 py-2">{txn.fromAmount || "N/A"}</td>
                  <td className="px-4 py-2">{txn.status || "N/A"}</td>
                  <td className="px-4 py-2">
                    {new Date(txn.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      )}
    </>
  );
};

export default SearchByFilter;
