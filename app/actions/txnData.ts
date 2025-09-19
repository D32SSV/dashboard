import axios, { AxiosResponse } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FilterTxn {
  limit: string;
  startDate: string;
  endDate: string;
  status: string;
}

export const searchById = async (token: string | null, txnId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions/txnId?txnId=${txnId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Something went wrong",
      };
    }

    // Fallback for non-Axios errors
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
};

export const filteredTxns = async (token: string | null, filter: FilterTxn) => {
  try {
    const { limit, startDate, endDate, status } = filter;
    const params = new URLSearchParams({
      limit: limit,
      startDate,
      endDate,
      status,
    });
    const response = await axios.get(
      `${BASE_URL}/transactions/filter?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Something went wrong",
      };
    }

    // Fallback for non-Axios errors
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
};
