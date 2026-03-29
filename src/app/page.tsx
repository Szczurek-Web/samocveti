import HeroSection from '@/components/home/HeroSection';
import QuickPicks from '@/components/home/QuickPicks';
import Categories from '@/components/home/Categories';
import USPSection from '@/components/home/USPSection';
import PopularProducts from '@/components/home/PopularProducts';
import Reviews from '@/components/home/Reviews';
import ContactsSection from '@/components/home/ContactsSection';
import { prisma } from '@/lib/db';
import { mapDbProduct } from '@/lib/productMapper';

export const revalidate = 3600;

export default async function Home() {
  const popularRaw = await prisma.product.findMany({
    where: { isPopular: true },
    take: 8,
  });

  const popularProducts = popularRaw.map(mapDbProduct);

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
      <PopularProducts products={popularProducts} />
      <div className="divider" />
      <Reviews />
      <div className="divider" />
      <ContactsSection />
    </>
  );
}
