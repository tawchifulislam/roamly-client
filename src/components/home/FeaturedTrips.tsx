'use client';

import { useEffect, useState } from 'react';
import { getFeaturedTrips } from '@/lib/api';
import { Trip } from '@/types/trip';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';

export default function FeaturedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedTrips();
        setTrips(data.trips);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-2xl font-bold">Featured Trips</h2>
        <a
          href="/explore"
          className="text-sm text-teal-700 underline underline-offset-4"
        >
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <TripCardSkeleton key={i} />
            ))
          : trips.map(trip => <TripCard key={trip._id} trip={trip} />)}
      </div>
    </section>
  );
}
