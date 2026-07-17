'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getTripById } from '@/lib/api';
import { Trip } from '@/types/trip';

export default function TripDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);
        setTrip(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trip');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading)
    return <div className="p-6 text-center">Loading trip details...</div>;
  if (error || !trip)
    return <div className="p-6 text-center text-red-500">Trip not found.</div>;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <div className="relative h-72 w-full rounded-xl overflow-hidden bg-gray-100">
        {trip.images[0] && (
          <Image
            src={trip.images[0]}
            alt={trip.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div>
        <p className="text-xs uppercase text-gray-400">{trip.type}</p>
        <h1 className="font-heading text-3xl font-bold">{trip.title}</h1>
        <p className="text-gray-500">{trip.location}</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-yellow-600">★ {trip.rating.toFixed(1)}</span>
          {trip.type === 'package' && (
            <span className="font-medium">
              ৳{trip.price} · {trip.duration}
            </span>
          )}
          {trip.type === 'destination' && (
            <span className="font-medium">
              Best time: {trip.bestTimeToVisit}
            </span>
          )}
        </div>
      </div>

      <section>
        <h2 className="font-heading text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-700">{trip.fullDescription}</p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold mb-2">
          Key Information
        </h2>
        <div className="flex flex-wrap gap-2">
          {trip.tags.map(tag => (
            <span
              key={tag}
              className="text-xs bg-gray-100 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
