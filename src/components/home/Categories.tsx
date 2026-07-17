const categories = [
  { label: 'Beach', emoji: '🏖️' },
  { label: 'Mountain', emoji: '⛰️' },
  { label: 'Adventure', emoji: '🧗' },
  { label: 'Culture', emoji: '🏛️' },
  { label: 'Wildlife', emoji: '🐅' },
  { label: 'City Break', emoji: '🌆' },
];

export default function Categories() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-2xl font-bold mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map(cat => (
            <a
              key={cat.label}
              href={`/explore?tag=${cat.label.toLowerCase()}`}
              className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
