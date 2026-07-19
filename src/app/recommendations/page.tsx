'use client';

import { useState } from 'react';
import {
  Sparkles,
  Waves,
  Mountain,
  Landmark,
  PawPrint,
  Building2,
  TentTree,
  Wand2,
} from 'lucide-react';
import { getRecommendations } from '@/lib/api';
import { RecommendationResult } from '@/types/recommendation';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';
import Container from '@/components/Container';

const interestOptions = [
  { label: 'Beach', value: 'beach', icon: Waves },
  { label: 'Mountain', value: 'mountain', icon: Mountain },
  { label: 'Adventure', value: 'adventure', icon: TentTree },
  { label: 'Culture', value: 'culture', icon: Landmark },
  { label: 'Wildlife', value: 'wildlife', icon: PawPrint },
  { label: 'City Break', value: 'city', icon: Building2 },
];

const budgetOptions = [
  { label: 'Low', value: 'low', hint: 'Budget-friendly' },
  { label: 'Medium', value: 'medium', hint: 'Balanced' },
  { label: 'High', value: 'high', hint: 'Premium' },
];

export default function RecommendationsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState('medium');
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

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
    setHasSearched(true);
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
    <div className="bg-gray-50 pb-14">
      <Container className="py-10 sm:py-14">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Find your perfect trip
          </h1>
        </div>

        {/* Preference form card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-900 mb-3 block">
              What are you interested in?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {interestOptions.map(({ label, value, icon: Icon }) => {
                const isSelected = selectedInterests.includes(value);
                return (
                  <button
                    key={value}
                    onClick={() => toggleInterest(value)}
                    className={`flex flex-col items-center gap-2 rounded-xl p-3 border transition-all ${
                      isSelected
                        ? 'border-teal-700 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-200 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-teal-700' : 'bg-gray-100'
                      }`}
                    >
                      <Icon
                        size={16}
                        className={isSelected ? 'text-white' : 'text-gray-500'}
                      />
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isSelected ? 'text-teal-700' : 'text-gray-600'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-900 mb-3 block">
              Budget range
            </label>
            <div className="grid grid-cols-3 gap-3">
              {budgetOptions.map(({ label, value, hint }) => (
                <button
                  key={value}
                  onClick={() => setBudgetRange(value)}
                  className={`rounded-xl p-3 border text-left transition-all ${
                    budgetRange === value
                      ? 'border-teal-700 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-200 hover:bg-gray-50'
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      budgetRange === value ? 'text-teal-700' : 'text-gray-800'
                    }`}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-gray-400">{hint}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGetRecommendations}
            disabled={loading || selectedInterests.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Wand2 size={16} />
            {loading ? 'Finding your matches...' : 'Get Recommendations'}
          </button>

          {selectedInterests.length === 0 && (
            <p className="text-xs text-gray-400 text-center mt-2">
              Select at least one interest to continue
            </p>
          )}
          {error && (
            <p className="text-red-500 text-xs text-center mt-3">{error}</p>
          )}
        </div>

        {/* Results */}
        <div className="max-w-5xl mx-auto mt-10">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <TripCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles size={16} className="text-teal-700" />
                <h2 className="font-heading font-semibold text-gray-900">
                  Recommended for you
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.map(({ trip, reason }) => (
                  <div key={trip._id} className="space-y-2">
                    <TripCard trip={trip} />
                    <div className="flex items-start gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
                      <Sparkles
                        size={12}
                        className="text-orange-500 mt-0.5 shrink-0"
                      />
                      <p className="text-xs text-orange-800 leading-relaxed">
                        {reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && hasSearched && results.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                No matches found. Try selecting different interests.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
