export default function TripCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden animate-pulse">
      <div className="h-40 w-full bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}
