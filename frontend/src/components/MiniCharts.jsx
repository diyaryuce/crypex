import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

export default function MiniChart({ className, data }) {
  return (
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>

          <YAxis domain={["dataMin", "dataMax"]} hide />

          <Area
            type="monotone"
            dataKey="price"
            stroke="#34d399"
            strokeWidth={2}
            fill="url(#chartGradient)"
            dot={false}
            animationDuration={400}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export const chartData = {
  USD: [
    { price: 100 },
    { price: 100.1 },
    { price: 99.9 },
    { price: 100.05 },
    { price: 100 },
    { price: 100.08 },
    { price: 99.98 },
  ],
};

export const cryptoChartData = {
  SOL: [
    { price: 14 },
    { price: 19 },
    { price: 17 },
    { price: 22 },
    { price: 21 },
    { price: 26 },
    { price: 29 },
    { price: 27 },
    { price: 31 },
    { price: 30 },
  ],

  BNB: [
    { price: 20 },
    { price: 26 },
    { price: 23 },
    { price: 29 },
    { price: 28 },
    { price: 34 },
    { price: 38 },
    { price: 36 },
    { price: 41 },
    { price: 45 },
  ],
};
