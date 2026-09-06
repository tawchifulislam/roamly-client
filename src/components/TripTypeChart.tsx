'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, MapPinned } from 'lucide-react';
import { Trip } from '@/types/trip';

const COLORS = { package: '#0d3b3e', destination: '#c08a3e' };

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
                  borderRadius: 12,
                  border: '1px solid #e4e6df',
                  fontSize: 12,
                  boxShadow: '0 8px 24px rgba(10,36,38,0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="font-heading text-2xl font-bold text-ink-900">
              {trips.length}
            </p>
            <p className="text-[11px] text-ink-500">Total Trips</p>
          </div>
        </div>
      </div>

      <div className="sm:col-span-3 space-y-3">
        <p className="text-sm font-semibold text-ink-900">Your Trips by Type</p>

        {packageCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-delta-100 flex items-center justify-center shrink-0">
              <Package size={16} className="text-delta-700" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-ink-500">Trip Packages</p>
                <p className="text-sm font-semibold text-ink-900">
                  {packageCount}
                </p>
              </div>
              <div className="w-full h-1.5 bg-mist-200 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-delta-700 rounded-full"
                  style={{ width: `${(packageCount / trips.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {destinationCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-sand-100 flex items-center justify-center shrink-0">
              <MapPinned size={16} className="text-sand-600" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-ink-500">Destinations</p>
                <p className="text-sm font-semibold text-ink-900">
                  {destinationCount}
                </p>
              </div>
              <div className="w-full h-1.5 bg-mist-200 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-sand-500 rounded-full"
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
