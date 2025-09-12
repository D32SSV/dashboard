import axios, { AxiosResponse } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
type GetStatsResponse = {
  success: boolean;
  data?: DashStat[];
  message?: string;
};
type DashStat = {
  total: Stats;
  today: Stats;
};
export type Stats = {
  count?: number;
  statusBreakdown: {
    success: Status;
    failed: Status;
    pending: Status;
  };
  successRate?: number;
};
export type Status = {
  count: number;
  totalAmount: number;
};

export const getStats = async (
  token: string | null
): Promise<GetStatsResponse> => {
  try {
    const response = await axios.get<GetStatsResponse>(
      `${BASE_URL}/transactions/dash-stats`,
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
