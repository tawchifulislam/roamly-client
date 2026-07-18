"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyTrips, deleteTrip } from "@/lib/api";
import { Trip } from "@/types/trip";
import TripTypeChart from "@/components/TripTypeChart";

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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch-on-mount pattern, setState happens after await
    loadTrips();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this trip?");
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteTrip(id);
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading your trips...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Manage Your Trips</h1>
        <Link href="/trips/add" className="rounded bg-black px-4 py-2 text-white text-sm">
          + Add Trip
        </Link>
      </div>

      {trips.length > 0 && (
        <div className="mb-6">
          <TripTypeChart trips={trips} />
        </div>
      )}

      {trips.length === 0 ? (
        <p className="text-gray-500">You haven&apos;t added any trips yet.</p>
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{trip.title}</p>
                <p className="text-sm text-gray-500">
                  {trip.location} · {trip.type === "package" ? `৳${trip.price}` : trip.bestTimeToVisit}
                </p>
              </div>
              <div className="flex gap-3">
                <Link href={`/trips/${trip._id}`} className="text-sm text-blue-600">
                  View
                </Link>
                <button
                  onClick={() => handleDelete(trip._id)}
                  disabled={deletingId === trip._id}
                  className="text-sm text-red-600"
                >
                  {deletingId === trip._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}