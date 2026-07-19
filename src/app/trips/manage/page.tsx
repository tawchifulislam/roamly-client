'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Eye, Trash2, MapPin, Package } from 'lucide-react';
import { getMyTrips, deleteTrip } from '@/lib/api';
import { Trip } from '@/types/trip';
import TripTypeChart from '@/components/TripTypeChart';
import Container from '@/components/Container';

export default function ManageTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadTrips = async () => {
    try {
      const data = await getMyTrips();
      setTrips(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    loadTrips();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this trip?');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteTrip(id);
      setTrips(prev => prev.filter(trip => trip._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <Container>
          <div className="max-w-4xl mx-auto animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded-xl" />
            <div className="h-16 bg-gray-200 rounded-xl" />
            <div className="h-16 bg-gray-200 rounded-xl" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-14">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
                Manage Your Trips
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {trips.length} trip{trips.length !== 1 ? 's' : ''} listed
              </p>
            </div>
            <Link
              href="/trips/add"
              className="hidden sm:flex items-center gap-2 rounded-lg bg-teal-700 hover:bg-teal-800 px-4 py-2.5 text-white text-sm font-medium transition-colors"
            >
              <PlusCircle size={16} />
              Add Trip
            </Link>
          </div>

          {trips.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <span className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <Package size={24} className="text-teal-700" />
              </span>
              <h3 className="font-heading font-semibold text-gray-900 mb-1">
                No trips yet
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                Start sharing your travel packages and destinations
              </p>
              <Link
                href="/trips/add"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 hover:bg-teal-800 px-4 py-2.5 text-white text-sm font-medium transition-colors"
              >
                <PlusCircle size={16} />
                Add Your First Trip
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                <TripTypeChart trips={trips} />
              </div>

              <div className="space-y-3">
                {trips.map(trip => (
                  <div
                    key={trip._id}
                    className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4 hover:border-teal-200 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-wide text-teal-700 bg-teal-50 rounded-full px-2 py-0.5">
                          {trip.type}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900 truncate mt-1">
                        {trip.title}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin size={11} />
                        {trip.location}
                        <span className="mx-1">·</span>
                        {trip.type === 'package'
                          ? `৳${trip.price?.toLocaleString()}`
                          : trip.bestTimeToVisit}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/trips/${trip._id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-teal-700 transition-colors"
                        aria-label="View trip"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(trip._id)}
                        disabled={deletingId === trip._id}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                        aria-label="Delete trip"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <Link
            href="/trips/add"
            className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-white text-sm font-medium"
          >
            <PlusCircle size={16} />
            Add Trip
          </Link>
        </div>
      </Container>
    </div>
  );
}
