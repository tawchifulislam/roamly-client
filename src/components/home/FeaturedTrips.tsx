'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedTrips } from '@/lib/api';
import { Trip } from '@/types/trip';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';
import Container from '@/components/Container';

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
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
            Featured Trips
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Hand-picked destinations our travelers love most
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <TripCardSkeleton key={i} />
              ))
            : trips.map(trip => <TripCard key={trip._id} trip={trip} />)}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline"
          >
            View all trips
            <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
