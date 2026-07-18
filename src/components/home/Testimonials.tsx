import { Quote } from 'lucide-react';
import Container from '@/components/Container';

const testimonials = [
  {
    name: 'Rafiq Ahmed',
    trip: "Cox's Bazar Package",
    quote:
      'The itinerary was perfectly planned. Every detail was taken care of.',
  },
  {
    name: 'Nusrat Jahan',
    trip: 'Sundarbans Exploration',
    quote: 'An unforgettable wildlife experience. The guide info was spot on.',
  },
  {
    name: 'Tanvir Hasan',
    trip: 'Sylhet Tea Garden Tour',
    quote:
      'Booking was smooth and the recommendations matched exactly what I wanted.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
            What Travelers Say
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Real experiences from the Roamly community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <Quote
                size={22}
                className="text-orange-500 mb-3"
                fill="currentColor"
              />
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <span className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                  {t.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </span>
                <div>
                  <p className="font-medium text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
