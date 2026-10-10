import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

export default function MiniChart({ className, data, colour = "#34d399" }) {
  const id = useId();
  const gradientId = `chartGradient${id.replaceAll(":", "")}`;

  return (
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colour} stopOpacity={0.35} />
              <stop offset="100%" stopColor={colour} stopOpacity={0} />
            </linearGradient>
          </defs>

          <YAxis domain={["dataMin", "dataMax"]} hide />

          <Area
            type="monotone"
            dataKey="price"
            stroke={colour}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            animationDuration={400}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
