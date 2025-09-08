import React from "react";

interface CardProps {
  title: string;
  info: number;
  bgColor?:
    | "bg-amber-500"
    | "bg-green-500"
    | "bg-red-500"
    | "bg-blue-500"
    | "bg-violet-500";

  textColor?:
    | "text-amber-900"
    | "text-green-900"
    | "text-red-900"
    | "text-blue-900"
    | "text-violet-900";
}
const DashboardCard: React.FC<CardProps> = ({
  title,
  info,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={`${bgColor ? bgColor : "bg-amber-500"} ${
        textColor ? textColor : "text-amber-800"
      } shadow-md rounded-lg p-4 m-4 hover:shadow-lg transition-shadow duration-300 w-3xs max-w-3xs max-h-max capitalize`}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-lg">{parseFloat(info.toFixed(2))}</p>
    </div>
  );
};

export default DashboardCard;
