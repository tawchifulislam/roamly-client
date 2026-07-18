import { Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import Container from '@/components/Container';

const features = [
  {
    title: 'AI-Powered Planning',
    description:
      'Get personalized trip recommendations based on your budget and interests.',
    icon: Sparkles,
  },
  {
    title: 'Verified Listings',
    description:
      'Every trip and destination is reviewed for accuracy and quality.',
    icon: ShieldCheck,
  },
  {
    title: '24/7 Chat Support',
    description:
      'Our AI assistant helps you plan, ask questions, and adjust on the go.',
    icon: MessageCircle,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
            Why Travel with Roamly
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Everything you need for smarter, easier trip planning
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
            >
              <span className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <Icon size={26} className="text-teal-700" />
              </span>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
