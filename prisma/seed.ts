import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { categories, products } from '../src/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Seed Categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        image: cat.image,
      },
    });
    console.log(`Upserted category: ${cat.name}`);
  }

  // 2. Seed Products
  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        id: prod.id, // optional string
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        oldPrice: prod.oldPrice || null,
        images: prod.images,
        categoryId: prod.category, // assuming category in product maps to category ID
        inStock: 10,
        stone: prod.stone as Prisma.InputJsonValue,
        description: prod.description as Prisma.InputJsonValue,
        tags: prod.tags,
        suitableFor: prod.suitableFor,
        occasion: prod.occasion || [],
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        isNew: prod.isNew || false,
        isPopular: prod.isPopular || false,
        type: prod.type,
      },
    });
    console.log(`Upserted product: ${prod.name}`);
  }

  console.log('Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
