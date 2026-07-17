'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTrip } from '@/lib/api';

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
    imageUrl: '',
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
        images: form.imageUrl ? [form.imageUrl] : [],
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
      router.push('/trips/manage');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="font-heading text-2xl font-bold">Add a New Trip</h1>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={type === 'package'}
            onChange={() => setType('package')}
          />
          Trip Package
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={type === 'destination'}
            onChange={() => setType('destination')}
          />
          Destination
        </label>
      </div>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <input
        name="shortDescription"
        placeholder="Short Description"
        value={form.shortDescription}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <textarea
        name="fullDescription"
        placeholder="Full Description"
        value={form.fullDescription}
        onChange={handleChange}
        className="w-full border rounded p-2"
        rows={4}
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <input
        name="tags"
        placeholder="Tags (comma separated, e.g. beach, family)"
        value={form.tags}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      {type === 'package' ? (
        <>
          <input
            name="price"
            type="number"
            placeholder="Price (BDT)"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            name="duration"
            placeholder="Duration (e.g. 5 days 4 nights)"
            value={form.duration}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </>
      ) : (
        <input
          name="bestTimeToVisit"
          placeholder="Best Time to Visit (e.g. November to February)"
          value={form.bestTimeToVisit}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-black text-white rounded p-2"
      >
        {loading ? 'Submitting...' : 'Add Trip'}
      </button>
    </div>
  );
}
