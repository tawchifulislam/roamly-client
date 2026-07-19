import Link from 'next/link';
import { Compass, Home, Search } from 'lucide-react';
import Container from '@/components/Container';

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] flex items-center">
      <Container className="py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="relative inline-block mb-6">
            <span className="w-24 h-24 rounded-2xl bg-linear-to-br from-teal-700 to-teal-900 flex items-center justify-center mx-auto">
              <Compass size={40} className="text-white" />
            </span>
            <span className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold border-4 border-gray-50">
              !
            </span>
          </div>

          <p className="font-heading text-6xl font-bold text-teal-700 mb-2">
            404
          </p>
          <p className="text-gray-500 text-sm mb-8">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
            >
              <Home size={16} />
              Back to Home
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
            >
              <Search size={16} />
              Explore Trips
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
