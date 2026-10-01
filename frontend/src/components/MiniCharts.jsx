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
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
