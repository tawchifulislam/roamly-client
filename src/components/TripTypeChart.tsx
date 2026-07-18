"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Trip } from "@/types/trip";

const COLORS = ["#0f766e", "#f97316"];

export default function TripTypeChart({ trips }: { trips: Trip[] }) {
  const packageCount = trips.filter((t) => t.type === "package").length;
  const destinationCount = trips.filter((t) => t.type === "destination").length;

  const data = [
    { name: "Trip Packages", value: packageCount },
    { name: "Destinations", value: destinationCount },
  ].filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-heading font-semibold mb-3 text-sm">Your Trips by Type</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}