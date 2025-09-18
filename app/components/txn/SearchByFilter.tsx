import React, { useState } from "react";
import Loader from "../reusable/Loader";

const SearchByFilter = ({ token }: { token: string }) => {
  const [filters, setFilters] = useState({
    merchant: "",
    limit: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "merchant") {
      const merchantPrefix = value?.split("-")[0] || value;
      setFilters({ ...filters, merchant: merchantPrefix });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResults([]);

    try {
      const selectedMerchant = data.pnm.merchants.find(
        (f) => f.fullName === filters.merchant
      );

      const updatedData = {
        ...filters,
        merchant: selectedMerchant._id || "",
      };
      const response = await getFilteredTxns(id, updatedData, token);
      if (!response.success) throw new Error("No transactions found.");
      setResults(response.data);
      if (response.data.length === 0) {
        setError("No data found for above selected filters");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong.");
    } finally {
      setFilters({
        merchant: "",
        limit: "",
        startDate: "",
        endDate: "",
        status: "",
      });
      setIsLoading(false);
    }
  };

  // console.log(">>>>", filters);

  return (
    <section className="px-2 py-2">
      <h1 className="text-2xl font-semibold inverseTheme">Search by Filter</h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-7 gap-4 my-4 max-w-full"
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
            className="capitalize w-full px-4 py-[0.6rem] rounded-md border border-pink-600 bg-pink-200 dark:bg-gray-800 dark:text-pink-500 dark:border-gray-600 placeholder:text-pink-500"
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
            className="w-full px-4 py-2 rounded-md border border-pink-600 bg-pink-200 dark:bg-gray-800 dark:text-pink-500 dark:border-gray-600"
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
            className="w-full px-4 py-2 rounded-md border border-pink-600 bg-pink-200 dark:bg-gray-800 dark:text-pink-500 dark:border-gray-600"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 w-full inverseBtn rounded hover:bg-pink-300 dark:hover:bg-violet-400 disabled:opacity-50"
          >
            {isLoading ? <Loader /> : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 font-medium mb-4 text-center">{error}</div>
      )}

      {results.length > 0 && (
        <div className="overflow-x-auto mt-4 rounded-md border shadow-md inverseTheme">
          <table className="min-w-full text-sm text-left text-gray-900 dark:text-pink-500">
            <thead className="text-xs uppercase bg-pink-100 dark:bg-gray-700 text-pink-600 dark:text-pink-300">
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
                  className="border-t border-gray-200 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-gray-800"
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
        </div>
      )}
    </section>
  );
};

export default SearchByFilter;
