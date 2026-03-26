import HeroSection from '@/components/home/HeroSection';
import QuickPicks from '@/components/home/QuickPicks';
import Categories from '@/components/home/Categories';
import USPSection from '@/components/home/USPSection';
import PopularProducts from '@/components/home/PopularProducts';
import Reviews from '@/components/home/Reviews';
import ContactsSection from '@/components/home/ContactsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="divider" />
      <QuickPicks />
      <div className="divider" />
      <Categories />
      <div className="divider" />
      <USPSection />
      <div className="divider" />
      <PopularProducts />
      <div className="divider" />
      <Reviews />
      <div className="divider" />
      <ContactsSection />
    </>
  );
}
