'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, MapPinned } from 'lucide-react';
import { Trip } from '@/types/trip';

const COLORS = { package: '#0f766e', destination: '#f97316' };

export default function TripTypeChart({ trips }: { trips: Trip[] }) {
  const packageCount = trips.filter(t => t.type === 'package').length;
  const destinationCount = trips.filter(t => t.type === 'destination').length;

  const data = [
    { name: 'Trip Packages', key: 'package', value: packageCount },
    { name: 'Destinations', key: 'destination', value: destinationCount },
  ].filter(d => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center">
      {/* Chart */}
      <div className="sm:col-span-2 flex justify-center">
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={4}
                strokeWidth={0}
              >
                {data.map(entry => (
                  <Cell
                    key={entry.key}
                    fill={COLORS[entry.key as keyof typeof COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  fontSize: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="font-heading text-2xl font-bold text-gray-900">
              {trips.length}
            </p>
            <p className="text-[11px] text-gray-400">Total Trips</p>
          </div>
        </div>
      </div>

      {/* Legend / stats */}
      <div className="sm:col-span-3 space-y-3">
        <p className="text-sm font-semibold text-gray-900">
          Your Trips by Type
        </p>

        {packageCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
              <Package size={16} className="text-teal-700" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Trip Packages</p>
                <p className="text-sm font-semibold text-gray-900">
                  {packageCount}
                </p>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-teal-700 rounded-full"
                  style={{ width: `${(packageCount / trips.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {destinationCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
              <MapPinned size={16} className="text-orange-500" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Destinations</p>
                <p className="text-sm font-semibold text-gray-900">
                  {destinationCount}
                </p>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{
                    width: `${(destinationCount / trips.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
