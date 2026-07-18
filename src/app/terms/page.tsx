import { FileText } from 'lucide-react';
import Container from '@/components/Container';

const sections = [
  {
    title: 'Using Roamly',
    body: 'By creating an account, you agree to provide accurate information and use the platform only for lawful trip discovery and listing purposes.',
  },
  {
    title: 'Listings',
    body: 'Users who add trip packages or destinations are responsible for the accuracy of the information provided. Roamly reserves the right to remove listings that violate these terms.',
  },
  {
    title: 'Limitation of Liability',
    body: 'Roamly acts as a discovery platform and is not liable for the actual travel services, bookings, or experiences provided by third parties.',
  },
];

export default function TermsPage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
            <FileText size={22} className="text-teal-700" />
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Terms & Conditions
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
