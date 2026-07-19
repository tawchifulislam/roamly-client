'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Star, MapPin } from 'lucide-react';
import { getAllTrips, submitRating } from '@/lib/api';
import { Trip } from '@/types/trip';
import StarRatingInput from '@/components/StarRatingInput';
import Container from '@/components/Container';

export default function RateTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getAllTrips({ limit: '50' });
        setTrips(data.trips);
      } catch {
        toast.error('Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleRate = async (tripId: string) => {
    const value = ratings[tripId];
    if (!value) {
      toast.error('Select a star rating first');
      return;
    }

    setSubmittingId(tripId);
    try {
      const data = await submitRating(tripId, value);
      setTrips(prev =>
        prev.map(t => (t._id === tripId ? { ...t, rating: data.rating } : t)),
      );
      toast.success('Thanks for your rating!');
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to submit rating',
      );
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-14">
      <Container>
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Rate Trips
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Share your feedback on trips and destinations you&apos;ve
            experienced
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 text-sm">Loading trips...</p>
        ) : (
          <div className="max-w-2xl mx-auto space-y-3">
            {trips.map(trip => (
              <div
                key={trip._id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {trip.title}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <MapPin size={11} />
                    {trip.location}
                    <span className="mx-1">·</span>
                    <Star
                      size={11}
                      className="text-orange-500"
                      fill="currentColor"
                    />
                    {trip.rating.toFixed(1)} average
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <StarRatingInput
                    value={ratings[trip._id] ?? 0}
                    onChange={value =>
                      setRatings(prev => ({ ...prev, [trip._id]: value }))
                    }
                  />
                  <button
                    onClick={() => handleRate(trip._id)}
                    disabled={submittingId === trip._id}
                    className="text-xs font-medium bg-teal-700 hover:bg-teal-800 text-white rounded-lg px-3 py-2 transition-colors disabled:opacity-50"
                  >
                    {submittingId === trip._id ? 'Saving...' : 'Submit'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
