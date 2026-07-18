import {
  Waves,
  Mountain,
  Landmark,
  PawPrint,
  Building2,
  TentTree,
} from 'lucide-react';
import Container from '@/components/Container';

const categories = [
  { label: 'Beach', icon: Waves, query: 'beach' },
  { label: 'Mountain', icon: Mountain, query: 'mountain' },
  { label: 'Adventure', icon: TentTree, query: 'adventure' },
  { label: 'Culture', icon: Landmark, query: 'culture' },
  { label: 'Wildlife', icon: PawPrint, query: 'wildlife' },
  { label: 'City Break', icon: Building2, query: 'city' },
];

export default function Categories() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
            Browse by Category
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Find trips that match your travel style
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map(({ label, icon: Icon, query }) => (
            <a
              key={label}
              href={`/explore?location=${query}`}
              className="group flex flex-col items-center gap-3 bg-white rounded-xl p-5 border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all"
            >
              <span className="w-11 h-11 rounded-lg bg-teal-50 group-hover:bg-teal-700 flex items-center justify-center transition-colors">
                <Icon
                  size={20}
                  className="text-teal-700 group-hover:text-white transition-colors"
                />
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {label}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
