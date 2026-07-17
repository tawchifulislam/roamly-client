import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-gray-900 text-white py-16 text-center">
      <div className="mx-auto max-w-2xl px-6 space-y-5">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold">
          Ready to plan your next adventure?
        </h2>
        <p className="text-gray-400 text-sm">
          Let our AI assistant help you find the perfect trip in minutes.
        </p>
        <Link
          href="/explore"
          className="inline-block bg-white text-gray-900 px-6 py-3 rounded font-medium"
        >
          Start Exploring
        </Link>
      </div>
    </section>
  );
}
