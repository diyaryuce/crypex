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
  BTC: [
    { price: 62000 },
    { price: 63500 },
    { price: 64200 },
    { price: 63800 },
    { price: 63100 },
    { price: 62900 },
    { price: 64100 },
    { price: 65000 },
    { price: 64600 },
    { price: 65400 },
    { price: 64800 },
    { price: 63900 },
  ],

  ETH: [
    { price: 2500 },
    { price: 2460 },
    { price: 2380 },
    { price: 2320 },
    { price: 2350 },
    { price: 2440 },
    { price: 2480 },
    { price: 2450 },
    { price: 2510 },
    { price: 2550 },
    { price: 2490 },
  ],

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
  BTC: [
    { price: 22 },
    { price: 28 },
    { price: 24 },
    { price: 31 },
    { price: 29 },
    { price: 35 },
    { price: 42 },
    { price: 39 },
    { price: 44 },
    { price: 48 },
  ],

  ETH: [
    { price: 18 },
    { price: 23 },
    { price: 20 },
    { price: 27 },
    { price: 25 },
    { price: 30 },
    { price: 34 },
    { price: 32 },
    { price: 36 },
    { price: 33 },
  ],

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
