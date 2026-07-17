import Hero from '@/components/home/Hero';
import FeaturedTrips from '@/components/home/FeaturedTrips';
import Categories from '@/components/home/Categories';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedTrips />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <CTA />
    </main>
  );
}
