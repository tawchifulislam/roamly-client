import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Trip } from '@/types/trip';

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="group bg-white rounded-2xl border border-mist-200 overflow-hidden hover:shadow-[0_16px_40px_rgba(10,36,38,0.1)] hover:border-delta-100 transition-all flex flex-col">
      <Link
        href={`/trips/${trip._id}`}
        className="block relative h-44 w-full bg-mist-100 overflow-hidden"
      >
        {trip.images && trip.images.length > 0 && (
          <Image
            src={trip.images[0]}
            alt={trip.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <span className="absolute top-3 left-3 text-[11px] font-medium uppercase tracking-wide bg-white/90 backdrop-blur-sm text-delta-700 rounded-full px-2.5 py-1">
          {trip.type === 'package' ? 'Package' : 'Destination'}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-ink-900 rounded-full px-2 py-1">
          <Star size={11} className="text-sand-500" fill="currentColor" />
          {trip.rating.toFixed(1)}
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-ink-900 line-clamp-1">
          {trip.title}
        </h3>
        <p className="flex items-center gap-1 text-xs text-ink-500 mt-1">
          <MapPin size={12} />
          {trip.location}
        </p>
        <p className="text-sm text-ink-500 line-clamp-2 mt-2 flex-1">
          {trip.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-mist-200">
          <span className="text-sm font-semibold text-ink-900">
            {trip.type === 'package'
              ? `৳${trip.price?.toLocaleString()}`
              : trip.bestTimeToVisit}
          </span>
          <Link
            href={`/trips/${trip._id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-delta-700 hover:gap-1.5 transition-all"
          >
            View Details
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
