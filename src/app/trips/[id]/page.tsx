'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getTripById, getRelatedTrips } from '@/lib/api';
import { Trip } from '@/types/trip';
import TripCard from '@/components/TripCard';
import Container from '@/components/Container';
import ContactBookingCard from '@/components/ContactBookingCard';

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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <Container>
          <div className="max-w-5xl mx-auto animate-pulse space-y-6">
            <div className="h-80 bg-gray-200 rounded-2xl" />
            <div className="h-6 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>
        </Container>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="bg-gray-50 min-h-screen py-16 text-center">
        <p className="text-gray-500">Trip not found.</p>
        <Link
          href="/explore"
          className="text-teal-700 text-sm font-medium hover:underline mt-2 inline-block"
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  const hasMultipleImages = trip.images && trip.images.length > 1;

  return (
    <div className="bg-gray-50 pb-16">
      <Container className="py-8 sm:py-10">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-700 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - gallery + content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="space-y-2">
              <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden bg-gray-200">
                {trip.images?.[activeImage] && (
                  <Image
                    src={trip.images[activeImage]}
                    alt={trip.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-4 left-4 text-xs font-medium uppercase tracking-wide bg-white/90 backdrop-blur-sm text-teal-700 rounded-full px-3 py-1.5">
                  {trip.type === 'package' ? 'Trip Package' : 'Destination'}
                </span>
              </div>

              {hasMultipleImages && (
                <div className="flex gap-2">
                  {trip.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
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

            {/* Title block (mobile/tablet) */}
            <div className="lg:hidden">
              <TitleBlock trip={trip} />
            </div>

            {/* Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                Overview
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {trip.fullDescription}
              </p>
            </div>

            {/* Key information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                Key Information
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                <InfoStat
                  icon={MapPin}
                  label="Location"
                  value={trip.location}
                />
                {trip.type === 'package' ? (
                  <>
                    <InfoStat
                      icon={Clock}
                      label="Duration"
                      value={trip.duration ?? '-'}
                    />
                    <InfoStat
                      icon={Calendar}
                      label="Price"
                      value={`৳${trip.price?.toLocaleString()}`}
                    />
                  </>
                ) : (
                  <InfoStat
                    icon={Calendar}
                    label="Best Time"
                    value={trip.bestTimeToVisit ?? '-'}
                  />
                )}
              </div>

              {trip.tags.length > 0 && (
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2">
                    <Tag size={12} />
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trip.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-teal-50 text-teal-700 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - sticky sidebar (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <TitleBlock trip={trip} />
              </div>
              <ContactBookingCard />
            </div>
          </div>
        </div>

        {/* Related trips */}
        {relatedTrips.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-gray-900 mb-5">
              More Trips in {trip.location}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedTrips.map(related => (
                <TripCard key={related._id} trip={related} />
              ))}
              <ContactBookingCard />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

function TitleBlock({ trip }: { trip: Trip }) {
  return (
    <div>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
        {trip.title}
      </h1>
      <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
        <MapPin size={14} />
        {trip.location}
      </p>
      <div className="flex items-center gap-1.5 mt-2">
        <Star size={15} className="text-orange-500" fill="currentColor" />
        <span className="text-sm font-medium text-gray-800">
          {trip.rating.toFixed(1)}
        </span>
        <span className="text-sm text-gray-400">rating</span>
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4">
        {trip.type === 'package' ? (
          <>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="font-heading text-2xl font-bold text-teal-700">
              ৳{trip.price?.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">{trip.duration}</p>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-400">Best time to visit</p>
            <p className="font-heading text-lg font-semibold text-gray-900">
              {trip.bestTimeToVisit}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function InfoStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-teal-700" />
      </span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
