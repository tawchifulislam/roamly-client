import Link from 'next/link';
import Image from 'next/image';
import { Trip } from '@/types/trip';

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${trip._id}`}
      className="block border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-40 w-full bg-gray-100">
        {trip.images[0] && (
          <Image
            src={trip.images[0]}
            alt={trip.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="text-xs uppercase text-gray-400">{trip.type}</p>
        <h3 className="font-heading font-semibold line-clamp-1">
          {trip.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">{trip.location}</p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {trip.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium">
            {trip.type === 'package' ? `৳${trip.price}` : trip.bestTimeToVisit}
          </span>
          <span className="text-sm text-yellow-600">
            ★ {trip.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
