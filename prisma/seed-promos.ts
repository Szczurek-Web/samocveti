import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding promo codes...');

  const promos = [
    { code: 'samocveti10', discount: 0.10, maxUses: 100 },
    { code: 'gift2024', discount: 0.10, maxUses: 50 },
    { code: 'welcome15', discount: 0.15, maxUses: 200 },
    { code: 'vip20', discount: 0.20, maxUses: 20, expiresAt: new Date('2027-01-01') },
  ];

  for (const p of promos) {
    await prisma.promoCode.upsert({
      where: { code: p.code },
      update: {},
      create: {
        code: p.code,
        discount: p.discount,
        maxUses: p.maxUses,
        expiresAt: p.expiresAt || null,
      },
    });
    console.log(`  ✓ ${p.code} (${p.discount * 100}%)`);
  }

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
