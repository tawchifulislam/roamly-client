'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  ImageIcon,
  Tag,
  DollarSign,
  Clock,
  Calendar,
} from 'lucide-react';
import { createTrip } from '@/lib/api';
import Container from '@/components/Container';
import { toast } from 'sonner';

export default function AddTripPage() {
  const router = useRouter();
  const [type, setType] = useState<'package' | 'destination'>('package');
  const [form, setForm] = useState({
    title: '',
    location: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    duration: '',
    bestTimeToVisit: '',
    imageUrls: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const payload: Record<string, unknown> = {
        type,
        title: form.title,
        location: form.location,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        images: form.imageUrls
          .split(',')
          .map(url => url.trim())
          .filter(Boolean),
        tags: form.tags
          .split(',')
          .map(t => t.trim())
          .filter(Boolean),
      };

      if (type === 'package') {
        payload.price = Number(form.price);
        payload.duration = form.duration;
      } else {
        payload.bestTimeToVisit = form.bestTimeToVisit;
      }

      await createTrip(payload);
      toast.success('Trip added successfully!');
      router.push('/trips/manage');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-teal-700';

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-10">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
              Add a New Trip
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Share a trip package or destination with the Roamly community
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-5">
            {/* Type selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setType('package')}
                className={`rounded-xl p-3 border text-left transition-all ${
                  type === 'package'
                    ? 'border-teal-700 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-200'
                }`}
              >
                <p
                  className={`text-sm font-semibold ${type === 'package' ? 'text-teal-700' : 'text-gray-800'}`}
                >
                  Trip Package
                </p>
                <p className="text-xs text-gray-400">
                  Bookable, with itinerary
                </p>
              </button>
              <button
                onClick={() => setType('destination')}
                className={`rounded-xl p-3 border text-left transition-all ${
                  type === 'destination'
                    ? 'border-teal-700 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-200'
                }`}
              >
                <p
                  className={`text-sm font-semibold ${type === 'destination' ? 'text-teal-700' : 'text-gray-800'}`}
                >
                  Destination
                </p>
                <p className="text-xs text-gray-400">
                  Explore-only, no booking
                </p>
              </button>
            </div>

            <FormField label="Title">
              <input
                name="title"
                placeholder="e.g. Cox's Bazar Beach Escape"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-700"
              />
            </FormField>

            <FormField label="Location">
              <div className="relative">
                <MapPin
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  name="location"
                  placeholder="e.g. Cox's Bazar, Bangladesh"
                  value={form.location}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </FormField>

            <FormField label="Short Description">
              <input
                name="shortDescription"
                placeholder="One-line summary shown on trip cards"
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-700"
              />
            </FormField>

            <FormField label="Full Description">
              <textarea
                name="fullDescription"
                placeholder="Detailed overview shown on the trip's details page"
                value={form.fullDescription}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-700"
              />
            </FormField>

            <FormField
              label="Image URLs"
              hint="Comma separated for multiple images"
            >
              <div className="relative">
                <ImageIcon
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  name="imageUrls"
                  placeholder="https://... , https://..."
                  value={form.imageUrls}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </FormField>

            <FormField label="Tags" hint="Comma separated, e.g. beach, family">
              <div className="relative">
                <Tag
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  name="tags"
                  placeholder="beach, relaxation, family"
                  value={form.tags}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </FormField>

            {type === 'package' ? (
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Price (BDT)">
                  <div className="relative">
                    <DollarSign
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      name="price"
                      type="number"
                      placeholder="15000"
                      value={form.price}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </FormField>
                <FormField label="Duration">
                  <div className="relative">
                    <Clock
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      name="duration"
                      placeholder="5 days 4 nights"
                      value={form.duration}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </FormField>
              </div>
            ) : (
              <FormField label="Best Time to Visit">
                <div className="relative">
                  <Calendar
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    name="bestTimeToVisit"
                    placeholder="November to February"
                    value={form.bestTimeToVisit}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </FormField>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Add Trip'}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1.5 block">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
