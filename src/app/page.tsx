import Hero from '@/components/home/Hero';
import FeaturedTrips from '@/components/home/FeaturedTrips';
import Categories from '@/components/home/Categories';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedTrips />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
