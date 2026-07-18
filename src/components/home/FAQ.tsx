'use client';

import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Container from '@/components/Container';

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
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={22} className="text-teal-700" />
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.q}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center gap-4"
                  >
                    <span className="font-medium text-sm text-gray-900">
                      {item.q}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <Minus size={14} className="text-teal-700" />
                      ) : (
                        <Plus size={14} className="text-teal-700" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
