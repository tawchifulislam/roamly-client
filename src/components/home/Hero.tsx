import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[65vh] min-h-105 flex items-center justify-center bg-linear-to-br from-teal-700 to-teal-900 text-white text-center px-4">
      <div className="max-w-2xl space-y-6">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-tight">
          Discover your next journey
        </h1>
        <p className="text-teal-100 text-lg">
          Curated trip packages and hidden destinations, planned smarter with
          AI.
        </p>

        <form
          action="/explore"
          className="flex flex-col sm:flex-row gap-3 bg-white rounded-lg p-2 max-w-lg mx-auto"
        >
          <input
            type="text"
            name="location"
            placeholder="Where do you want to go?"
            className="flex-1 px-3 py-2 rounded text-gray-800 outline-none"
          />
          <button
            type="submit"
            className="bg-teal-700 text-white px-5 py-2 rounded font-medium hover:bg-teal-800"
          >
            Search
          </button>
        </form>

        <div>
          <Link
            href="/explore"
            className="inline-block text-sm text-teal-100 underline underline-offset-4"
          >
            Or browse all trips →
          </Link>
        </div>
      </div>
    </section>
  );
}
