'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { getAllTrips } from '@/lib/api';
import { Trip } from '@/types/trip';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';
import Container from '@/components/Container';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          page: String(page),
          limit: '8',
        };
        if (search) params.location = search;
        if (type) params.type = type;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (sort) params.sort = sort;

        const data = await getAllTrips(params);
        setTrips(data.trips);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [search, type, minPrice, maxPrice, sort, page]);

  const resetPage = () => setPage(1);

  const clearFilters = () => {
    setSearch('');
    setType('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
    resetPage();
  };

  const hasActiveFilters = search || type || minPrice || maxPrice || sort;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-10 sm:py-14">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Explore Trips
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {loading
              ? 'Searching...'
              : `${total} trip${total !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Search bar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search by location..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                resetPage();
              }}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters(prev => !prev)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              showFilters
                ? 'bg-teal-700 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 max-w-2xl mx-auto mb-8 flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-35">
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Type
              </label>
              <select
                value={type}
                onChange={e => {
                  setType(e.target.value);
                  resetPage();
                }}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-teal-700"
              >
                <option value="">All Types</option>
                <option value="package">Trip Package</option>
                <option value="destination">Destination</option>
              </select>
            </div>

            <div className="w-24">
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Min Price
              </label>
              <input
                type="number"
                placeholder="৳0"
                value={minPrice}
                onChange={e => {
                  setMinPrice(e.target.value);
                  resetPage();
                }}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-teal-700"
              />
            </div>

            <div className="w-24">
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Max Price
              </label>
              <input
                type="number"
                placeholder="৳∞"
                value={maxPrice}
                onChange={e => {
                  setMaxPrice(e.target.value);
                  resetPage();
                }}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-teal-700"
              />
            </div>

            <div className="flex-1 min-w-40">
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Sort By
              </label>
              <select
                value={sort}
                onChange={e => {
                  setSort(e.target.value);
                  resetPage();
                }}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-teal-700"
              >
                <option value="">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-600 px-2 py-2"
              >
                <X size={13} />
                Clear
              </button>
            )}
          </div>
        )}

        {/* Results grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <TripCardSkeleton key={i} />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              No trips found. Try adjusting your filters.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-3 text-sm text-teal-700 font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trips.map(trip => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-500 px-3">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
