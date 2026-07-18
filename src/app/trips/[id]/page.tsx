'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getTripById, getRelatedTrips } from '@/lib/api';
import { Trip } from '@/types/trip';
import TripCard from '@/components/TripCard';

export default function TripDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [relatedTrips, setRelatedTrips] = useState<Trip[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);
        setTrip(data);

        const related = await getRelatedTrips(data.location, data._id);
        setRelatedTrips(related);
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

  const hasMultipleImages = trip.images && trip.images.length > 1;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <div className="space-y-2">
        <div className="relative h-72 w-full rounded-xl overflow-hidden bg-gray-100">
          {trip.images?.[activeImage] && (
            <Image
              src={trip.images[activeImage]}
              alt={trip.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          )}
        </div>

        {hasMultipleImages && (
          <div className="flex gap-2">
            {trip.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 ${
                  activeImage === index
                    ? 'border-teal-700'
                    : 'border-transparent'
                }`}
              >
                <Image
                  src={img}
                  alt={`${trip.title} ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
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

      {relatedTrips.length > 0 && (
        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">
            More Trips in {trip.location}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedTrips.map(related => (
              <TripCard key={related._id} trip={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
