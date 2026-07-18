import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/Container';

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 bg-gray-900 text-white text-center">
      <Container>
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Ready to plan your next adventure?
          </h2>
          <p className="text-gray-400 text-sm">
            Let our AI assistant help you find the perfect trip in minutes.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Exploring
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
