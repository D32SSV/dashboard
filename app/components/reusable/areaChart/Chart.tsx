import { Stats, Status } from "@/app/actions/stats";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type MetricType = "count" | "totalAmount";

interface ChartProps {
  data: Stats | null;
  metric: MetricType;
}

const STATUS_COLORS: Record<string, string> = {
  success: "#00c951",
  failed: "#fb2c36",
  pending: "#fd9a00",
};

const Chart = ({ data, metric }: ChartProps) => {
  const { statusBreakdown } = data || {};

  const chartData = Object.entries(statusBreakdown || {}).map(
    ([status, values]) => ({
      name: status,
      value: (values as Status)[metric],
    })
  );
  console.log(chartData);
  const hasData = chartData.some((entry) => entry.value > 0);

  return (
    <div className="h-64 w-full md:w-1/2 max-w-md border border-dashed rounded-2xl flex flex-col">
      <p className="capitalize px-4 pt-2 text-xl font-semibold text-gray-400">
        {metric === "totalAmount" ? "Amount" : metric} of Transactions
      </p>

      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">
            Not enough data available for{" "}
            {metric === "totalAmount" ? "amount" : metric}
          </p>
        </div>
      )}
    </div>
  );
};

export default Chart;
