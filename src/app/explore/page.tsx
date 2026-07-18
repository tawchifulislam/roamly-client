'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllTrips } from '@/lib/api';
import { Trip } from '@/types/trip';
import TripCard from '@/components/TripCard';
import TripCardSkeleton from '@/components/TripCardSkeleton';

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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [search, type, minPrice, maxPrice, sort, page]);

  const resetPage = () => setPage(1);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="font-heading text-2xl font-bold mb-6">Explore Trips</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          placeholder="Search by location..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            resetPage();
          }}
          className="border rounded p-2 flex-1 min-w-50"
        />

        <select
          value={type}
          onChange={e => {
            setType(e.target.value);
            resetPage();
          }}
          className="border rounded p-2"
        >
          <option value="">All Types</option>
          <option value="package">Trip Package</option>
          <option value="destination">Destination</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => {
            setMinPrice(e.target.value);
            resetPage();
          }}
          className="border rounded p-2 w-28"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => {
            setMaxPrice(e.target.value);
            resetPage();
          }}
          className="border rounded p-2 w-28"
        />

        <select
          value={sort}
          onChange={e => {
            setSort(e.target.value);
            resetPage();
          }}
          className="border rounded p-2"
        >
          <option value="">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <p className="text-gray-500">
          No trips found. Try adjusting your filters.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trips.map(trip => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
