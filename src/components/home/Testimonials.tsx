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
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-2xl font-bold mb-8 text-center">
          What Travelers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white rounded-xl p-6 border">
              <p className="text-gray-600 text-sm mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-medium text-sm">{t.name}</p>
              <p className="text-xs text-gray-400">{t.trip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
