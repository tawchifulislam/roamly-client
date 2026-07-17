const features = [
  {
    title: 'AI-Powered Planning',
    description:
      'Get personalized trip recommendations based on your budget and interests.',
    icon: '✨',
  },
  {
    title: 'Verified Listings',
    description:
      'Every trip and destination is reviewed for accuracy and quality.',
    icon: '✅',
  },
  {
    title: '24/7 Chat Support',
    description:
      'Our AI assistant helps you plan, ask questions, and adjust on the go.',
    icon: '💬',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-heading text-2xl font-bold mb-8 text-center">
        Why Travel with Roamly
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map(f => (
          <div key={f.title} className="text-center p-6 border rounded-xl">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-heading font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
