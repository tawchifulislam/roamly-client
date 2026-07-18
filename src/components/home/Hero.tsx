import Link from 'next/link';
import { Search, Star, MapPin, TrendingUp } from 'lucide-react';
import Container from '@/components/Container';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-teal-50 via-white to-white">
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — text + search */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-100 rounded-full px-3 py-1 mb-5">
              <TrendingUp size={13} />
              AI-powered trip planning
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-[1.1] text-gray-900">
              Discover your next <span className="text-teal-700">journey</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg mt-5 max-w-md mx-auto lg:mx-0">
              Curated trip packages and hidden destinations, planned smarter
              with AI.
            </p>

            <form
              action="/explore"
              className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl border border-gray-200 shadow-sm p-2 max-w-md mx-auto lg:mx-0 mt-8"
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
              className="inline-block text-sm text-teal-700 font-medium hover:underline mt-5"
            >
              Or browse all trips →
            </Link>
          </div>

          {/* Right — illustration + floating cards */}
          <div className="relative hidden lg:block">
            <svg viewBox="0 0 480 420" className="w-full h-auto">
              <circle
                cx="240"
                cy="210"
                r="190"
                fill="#0f766e"
                fillOpacity="0.06"
              />
              <circle
                cx="360"
                cy="90"
                r="60"
                fill="#f97316"
                fillOpacity="0.08"
              />

              {/* dotted route path */}
              <path
                d="M70 320 C 140 260, 160 160, 250 130 S 400 90, 420 40"
                fill="none"
                stroke="#0f766e"
                strokeWidth="3"
                strokeDasharray="2 12"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* location pins */}
              <g transform="translate(58, 300)">
                <circle cx="12" cy="12" r="12" fill="#0f766e" />
                <circle cx="12" cy="12" r="4.5" fill="white" />
              </g>
              <g transform="translate(238, 118)">
                <circle cx="12" cy="12" r="10" fill="#f97316" />
                <circle cx="12" cy="12" r="4" fill="white" />
              </g>
              <g transform="translate(408, 28)">
                <circle cx="12" cy="12" r="12" fill="#0f766e" />
                <circle cx="12" cy="12" r="4.5" fill="white" />
              </g>

              {/* abstract mountain / terrain silhouette base */}
              <path
                d="M0 380 L90 300 L150 350 L230 260 L310 360 L380 300 L480 380 L480 420 L0 420 Z"
                fill="#0f766e"
                fillOpacity="0.1"
              />
              <path
                d="M40 380 L110 330 L170 365 L240 300 L320 375 L400 330 L480 380"
                fill="none"
                stroke="#0f766e"
                strokeWidth="2.5"
                opacity="0.35"
              />
            </svg>

            {/* Floating card 1 — rating */}
            <div className="animate-float absolute top-6 right-4 bg-white rounded-xl border border-gray-200 shadow-md px-4 py-3 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                <Star
                  size={16}
                  className="text-orange-500"
                  fill="currentColor"
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">4.9 / 5</p>
                <p className="text-xs text-gray-400">Traveler rating</p>
              </div>
            </div>

            {/* Floating card 2 — destination count */}
            <div className="animate-float-delayed absolute bottom-24 left-0 bg-white rounded-xl border border-gray-200 shadow-md px-4 py-3 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                <MapPin size={16} className="text-teal-700" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  50+ Places
                </p>
                <p className="text-xs text-gray-400">Across Bangladesh</p>
              </div>
            </div>

            {/* Floating card 3 — AI badge */}
            <div className="animate-float-delayed-2 absolute bottom-2 right-10 bg-teal-700 text-white rounded-xl shadow-md px-4 py-3 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                <TrendingUp size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold">AI Matched</p>
                <p className="text-xs text-teal-100">For your budget</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
