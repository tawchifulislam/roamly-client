'use client';

import { useState } from 'react';
import { getRecommendations } from '@/lib/api';
import { RecommendationResult } from '@/types/recommendation';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';

const interestOptions = [
  'beach',
  'adventure',
  'culture',
  'nature',
  'wildlife',
  'relaxation',
  'family',
];

export default function RecommendationsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('medium');
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest],
    );
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getRecommendations(selectedInterests, budgetRange);
      setResults(data.recommendations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">
          AI Trip Recommendations
        </h1>
        <p className="text-gray-500 text-sm">
          Tell us what you like, and our AI will match you with the best trips.
        </p>
      </div>

      <div className="space-y-4 border rounded-xl p-6">
        <div>
          <p className="font-medium mb-2">What are you interested in?</p>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedInterests.includes(interest)
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'border-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Budget range</p>
          <select
            value={budgetRange}
            onChange={e => setBudgetRange(e.target.value)}
            className="border rounded p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          onClick={handleGetRecommendations}
          disabled={loading || selectedInterests.length === 0}
          className="bg-teal-700 text-white px-5 py-2 rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Get Recommendations'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map(({ trip, reason }) => (
            <div key={trip._id} className="space-y-2">
              <TripCard trip={trip} />
              <p className="text-xs text-gray-500 italic px-1">✨ {reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
