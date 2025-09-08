"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { Stats, getStats } from "../actions/stats";
import { useAuth } from "../context/AuthContext";
import DashboardCard from "../components/reusable/dashboard-cards/DashboardCard";
import Loader from "../components/reusable/Loader";

type StatusKey = "success" | "failed" | "pending" | "successRate" | "count";

const renderStats = (stats: Stats | null, label: string) => {
  if (!stats) return null;

  const statusMapping: Record<StatusKey, string> = {
    success: "Success Transactions",
    failed: "Failed Transactions",
    pending: "Pending Transactions",
    successRate: "Success Rate",
    count: "Total Transactions",
  };

  return (
    <div className="mb-8">
      <p className="text-2xl font-bold mb-4">{label}</p>
      <div className="flex flex-wrap gap-4">
        {Object.entries(stats).map(([key, value], index) => {
          if (typeof value === "number") {
            return (
              <DashboardCard
                key={index}
                title={statusMapping[key as StatusKey]}
                info={value}
                bgColor={key === "successRate" ? "bg-blue-500" : "bg-amber-500"}
                textColor={
                  key === "successRate" ? "text-blue-900" : "text-amber-900"
                }
              />
            );
          }
          return Object.entries(value).map(
            ([statusKey, statusValue], index) => (
              <DashboardCard
                key={index}
                title={statusMapping[statusKey as StatusKey]}
                info={
                  typeof statusValue.count === "number"
                    ? statusValue.count
                    : statusValue.totalAmount
                }
                bgColor={
                  statusKey === "success"
                    ? "bg-green-500"
                    : statusKey === "failed"
                    ? "bg-red-500"
                    : "bg-violet-500"
                }
                textColor={
                  statusKey === "success"
                    ? "text-green-900"
                    : statusKey === "failed"
                    ? "text-red-900"
                    : "text-violet-900"
                }
              />
            )
          );
        })}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [todayStats, setTodayStats] = useState<Stats | null>(null);
  const [totalStats, setTotalStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoadig, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    const getData = async () => {
      console.log("RUNS EVERYTIME");

      try {
        setIsLoading(true);
        const response = await getStats(token);
        if (response.success && response.data) {
          setTodayStats(response.data[0].today);
          setTotalStats(response.data[0].total);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unexpected error occurred, could not get stats");
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [token]);

  if (error) {
    return (
      <ProtectedRoute>
        <div className="p-4 text-red-600 font-bold">{error}</div>
      </ProtectedRoute>
    );
  }

  if (isLoadig) {
    return (
      <ProtectedRoute>
        <div className="w-full h-[80vh] flex items-center justify-center flex-col gap-4">
          <Loader />
          <p>Loading... Please wait</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-4">
        {renderStats(todayStats, "Today's Stats")}
        {renderStats(totalStats, "Total Stats")}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
