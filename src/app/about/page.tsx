import { Compass, Users, MapPin, Sparkles } from 'lucide-react';
import Container from '@/components/Container';

const stats = [
  { label: 'Trips Listed', value: '500+', icon: Compass },
  { label: 'Destinations', value: '50+', icon: MapPin },
  { label: 'Happy Travelers', value: '10k+', icon: Users },
];

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-full px-3 py-1">
          <Sparkles size={13} />
          About Roamly
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mt-4 text-gray-900">
          Making trip planning effortless
        </h1>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Roamly is a travel discovery platform built to help explorers find
          curated trip packages and hidden destinations across Bangladesh and
          beyond. We combine local travel expertise with AI-powered
          recommendations to make trip planning faster and more personal.
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Our mission is simple: make it easy for anyone to discover a trip that
          fits their budget, interests, and schedule - without spending hours
          comparing options.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12 max-w-4xl mx-auto">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 p-6 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
              <Icon size={20} className="text-teal-700" />
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-gray-900">
                {value}
              </p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
