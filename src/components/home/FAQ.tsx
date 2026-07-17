'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How do I book a trip package?',
    a: "Browse the Explore page, open a trip's details, and follow the contact/booking information provided.",
  },
  {
    q: 'Can I list my own trip or destination?',
    a: "Yes, once logged in you can add trips from the 'Add Trip' page and manage them anytime.",
  },
  {
    q: 'Is Roamly free to use?',
    a: 'Browsing and account creation are completely free. Some trip packages may have their own pricing.',
  },
  {
    q: 'Does Roamly offer AI trip recommendations?',
    a: 'Yes, our AI assistant analyzes your preferences to suggest trips that match your budget and interests.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="font-heading text-2xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((item, index) => (
          <div key={item.q} className="border rounded-lg">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-4 py-3 flex justify-between items-center font-medium"
            >
              {item.q}
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="px-4 pb-3 text-sm text-gray-500">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
