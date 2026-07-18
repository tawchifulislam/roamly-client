'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Container from '@/components/Container';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-teal-700 to-teal-900 px-6 sm:px-12 py-12 sm:py-16 text-white text-center">
          <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/5" />
          <div className="absolute -left-8 -bottom-10 w-40 h-40 rounded-full bg-orange-500/10" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10">
              <Send size={20} />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              Get Travel Deals in Your Inbox
            </h2>
            <p className="text-teal-100 text-sm">
              Subscribe for curated trip ideas and seasonal discounts.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-sm font-medium pt-2">
                <CheckCircle2 size={18} />
                Thanks for subscribing! Check your inbox soon.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-gray-800 outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-white text-teal-800 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-teal-50 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
