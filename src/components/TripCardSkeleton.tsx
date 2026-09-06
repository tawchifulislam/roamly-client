export default function TripCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-mist-200 overflow-hidden animate-pulse">
      <div className="h-44 w-full bg-mist-200" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 w-3/4 bg-mist-200 rounded" />
        <div className="h-3 w-1/2 bg-mist-200 rounded" />
        <div className="h-3 w-full bg-mist-200 rounded" />
        <div className="h-3 w-2/3 bg-mist-200 rounded" />
        <div className="flex justify-between pt-3 border-t border-mist-200">
          <div className="h-4 w-16 bg-mist-200 rounded" />
          <div className="h-4 w-20 bg-mist-200 rounded" />
        </div>
      </div>
    </div>
  );
}
