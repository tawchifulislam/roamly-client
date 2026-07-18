import { ShieldCheck } from 'lucide-react';
import Container from '@/components/Container';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect your name, email, and trip preferences when you create an account or add a trip listing, to provide personalized recommendations and manage your account.',
  },
  {
    title: 'How We Use Your Data',
    body: 'Your data is used to operate your account, personalize AI recommendations, and improve our platform. We do not sell your personal information to third parties.',
  },
  {
    title: 'Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting support@roamly.com.',
  },
];

export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
            <ShieldCheck size={22} className="text-teal-700" />
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mt-2">Last updated: July 2026</p>
        </div>

        <div className="space-y-8">
          {sections.map(section => (
            <section
              key={section.title}
              className="border-l-2 border-teal-100 pl-5"
            >
              <h2 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
