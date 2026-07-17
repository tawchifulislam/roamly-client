'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-teal-800 text-white py-16">
      <div className="mx-auto max-w-2xl px-6 text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Get Travel Deals in Your Inbox
        </h2>
        <p className="text-teal-100 text-sm">
          Subscribe for curated trip ideas and seasonal discounts.
        </p>

        {submitted ? (
          <p className="text-sm font-medium">
            Thanks for subscribing! Check your inbox soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 rounded text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-white text-teal-800 px-5 py-2 rounded font-medium"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
