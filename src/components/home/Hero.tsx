import Link from 'next/link';
import { Search, Star, MapPin, Sparkles } from 'lucide-react';
import Container from '@/components/Container';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-700 to-teal-900">
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/5" />
      <div className="absolute -left-16 bottom-0 w-64 h-64 rounded-full bg-orange-500/10" />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-white/15 border border-white/20 rounded-full px-3 py-1.5 mb-6">
            <Sparkles size={13} />
            AI-powered trip planning
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Discover your next journey
          </h1>
          <p className="text-teal-100 text-base sm:text-lg mt-5 max-w-md mx-auto">
            Curated trip packages and hidden destinations, planned smarter with
            AI.
          </p>

          <form
            action="/explore"
            className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl shadow-lg p-2 max-w-md mx-auto mt-8"
          >
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="location"
                placeholder="Where do you want to go?"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-gray-800 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Search
            </button>
          </form>

          <Link
            href="/explore"
            className="inline-block text-sm text-teal-100 font-medium hover:text-white hover:underline mt-5"
          >
            Or browse all trips →
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-white">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Star
                  size={14}
                  className="text-orange-400"
                  fill="currentColor"
                />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold leading-none">4.9 / 5</p>
                <p className="text-xs text-white/60 mt-1">Traveler rating</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-white">
              <span className="w-8 h-8 rounded-lg bg-teal-400/20 flex items-center justify-center">
                <MapPin size={14} className="text-teal-300" />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold leading-none">50+ Places</p>
                <p className="text-xs text-white/60 mt-1">Across Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
