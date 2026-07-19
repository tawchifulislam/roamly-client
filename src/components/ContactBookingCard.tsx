import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export default function ContactBookingCard() {
  return (
    <div className="bg-linear-to-br from-teal-700 to-teal-900 text-white rounded-xl border border-teal-800 flex flex-col items-center justify-center text-center p-6 min-h-70">
      <span className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-3">
        <Phone size={20} />
      </span>
      <p className="font-heading font-semibold text-lg">Want to book a trip?</p>
      <p className="text-teal-100 text-sm mt-1 mb-4">
        Reach out and we&apos;ll help you plan the perfect getaway.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 bg-white text-teal-800 rounded-lg px-4 py-2 text-sm font-medium hover:bg-teal-50 transition-colors"
      >
        Contact Us
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
